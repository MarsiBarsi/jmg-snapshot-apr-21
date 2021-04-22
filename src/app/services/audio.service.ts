import {Inject, Injectable} from '@angular/core';
import {AUDIO_CONTEXT} from '@ng-web-apis/audio';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {FetchObservable} from 'src/app/utils/fetch-observable';

const HEADERS: RequestInit = {cache: 'force-cache'};

@Injectable({
    providedIn: 'root',
})
export class AudioService {
    private readonly cache = new Map<string, Observable<AudioBuffer>>();

    constructor(@Inject(AUDIO_CONTEXT) private readonly context: BaseAudioContext) {}

    fetch(url: string): Observable<AudioBuffer | number> {
        return (
            this.cache.get(url) ||
            new FetchObservable(url, HEADERS).pipe(
                switchMap(resultOrProgress =>
                    typeof resultOrProgress === 'number'
                        ? of(resultOrProgress)
                        : new Promise<AudioBuffer>((resolve, reject) =>
                              this.context.decodeAudioData(
                                  resultOrProgress.buffer,
                                  resolve,
                                  reject,
                              ),
                          ),
                ),
                tap(buffer => {
                    if (typeof buffer !== 'number') {
                        this.cache.set(url, of(buffer));
                    }
                }),
            )
        );
    }
}
