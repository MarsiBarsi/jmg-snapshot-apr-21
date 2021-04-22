import {Inject, Injectable, NgZone} from '@angular/core';
import {WebAudioAnalyser} from '@ng-web-apis/audio';
import {TuiDestroyService, tuiZonefree} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {map, share, takeUntil} from 'rxjs/operators';

@Injectable()
export class VolumeService extends Observable<number> {
    constructor(
        @Inject(WebAudioAnalyser) {timeFloat$}: WebAudioAnalyser,
        @Inject(TuiDestroyService) destroy$: Observable<void>,
        @Inject(NgZone) ngZone: NgZone,
    ) {
        const volume$ = timeFloat$.pipe(
            map(array =>
                Math.sqrt(array.reduce((acc, cur) => acc + cur * cur, 0) / array.length),
            ),
            takeUntil(destroy$),
            tuiZonefree(ngZone),
            share(),
        );

        super(subscriber => volume$.subscribe(subscriber));
    }
}
