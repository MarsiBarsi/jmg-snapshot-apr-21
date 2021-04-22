import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {Inject, Injectable} from '@angular/core';
import {IntersectionObserverService} from '@ng-web-apis/intersection-observer';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {NEVER, Observable} from 'rxjs';
import {filter, map, mapTo, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {CALIBRATION} from 'src/app/tokens/calibration';
import {PREVIEW} from 'src/app/tokens/preview';

@Injectable()
export class PlayService extends Observable<MIDIMessageEvent> {
    constructor(
        @Inject(PREVIEW) preview: boolean,
        @Inject(CALIBRATION) calibration$: Observable<number>,
        @Inject(TuiDestroyService) destroy$: Observable<void>,
        @Inject(IntersectionObserverService)
        entries$: IntersectionObserverService,
    ) {
        const play$ = preview
            ? calibration$.pipe(
                  switchMap(offset =>
                      entries$.pipe(
                          filter(entries => entries[0].isIntersecting),
                          switchMap(() =>
                              entries$.pipe(
                                  filter(entries => !entries[0].isIntersecting),
                                  mapTo(false),
                                  startWith(true),
                              ),
                          ),
                          map(played => ({
                              ...new Event('play'),
                              receivedTime: 0,
                              data: new Uint8Array([144, -offset, played ? 100 : 0]),
                          })),
                      ),
                  ),
                  takeUntil(destroy$),
              )
            : NEVER;

        super(subscriber => play$.subscribe(subscriber));
    }
}
