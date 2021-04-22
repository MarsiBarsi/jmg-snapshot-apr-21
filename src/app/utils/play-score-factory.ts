import {ElementRef, Injector} from '@angular/core';
import {ANIMATION_FRAME} from '@ng-web-apis/common';
import {
    IntersectionObserverService,
    INTERSECTION_ROOT,
} from '@ng-web-apis/intersection-observer';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {merge, Observable, of, race, timer} from 'rxjs';
import {
    delay,
    filter,
    map,
    mapTo,
    pairwise,
    share,
    startWith,
    switchMap,
    take,
    takeUntil,
    withLatestFrom,
} from 'rxjs/operators';
import {NoteDirective} from 'src/app/components/note/note.directive';
import {THRESHOLD} from 'src/app/constants/threshold';
import {Composition} from 'src/app/interfaces/composition';
import {CALIBRATION} from 'src/app/tokens/calibration';
import {COMPOSITION} from 'src/app/tokens/composition';
import {NOTES} from 'src/app/tokens/notes';
import {SETTINGS} from 'src/app/tokens/settings';
import {isIntersecting} from 'src/app/utils/is-intersecting';
import {timeToScore} from 'src/app/utils/time-to-score';

export function playScoreFactory(injector: Injector): Observable<number> {
    const messages$ = injector.get(NOTES);
    const calibration$ = injector.get(CALIBRATION);
    const animationFrame$ = injector.get(ANIMATION_FRAME);
    const {id}: Composition = injector.get(COMPOSITION);
    const {offset, speed} = injector.get(SETTINGS);
    const root = injector.get(INTERSECTION_ROOT);
    const {nativeElement} = injector.get(ElementRef);
    const destroy$ = injector.get(TuiDestroyService);
    const entries$ = injector.get(IntersectionObserverService);
    const coefficient = (speed[id] || 100) / 100;
    const calibrated$ = messages$.pipe(
        withLatestFrom(calibration$),
        filter(
            ([{data}, offset]) => data[1] + offset === injector.get(NoteDirective).key,
        ),
    );

    const noteOn$ = calibrated$.pipe(
        filter(([{data}]) => !!data[2]),
        map(([{timeStamp}]) => timeStamp),
    );

    const noteOff$ = calibrated$.pipe(
        filter(([{data}]) => !data[2]),
        mapTo(0),
    );

    const on$ = entries$.pipe(
        filter(isIntersecting),
        take(1),
        map(([{time}]) => time),
    );

    const off$ = entries$.pipe(
        filter(entries => !entries[0].isIntersecting),
        mapTo(0),
    );

    const late$ = on$.pipe(
        switchMap(first =>
            noteOn$.pipe(
                takeUntil(timer(THRESHOLD)),
                map(second => coefficient * timeToScore(second - first)),
            ),
        ),
    );

    const early$ = noteOn$.pipe(
        switchMap(first =>
            on$.pipe(
                takeUntil(timer(THRESHOLD)),
                map(second => coefficient * timeToScore(second - first)),
            ),
        ),
    );

    const played$ = merge(early$, late$).pipe(
        switchMap(score => merge(noteOff$, off$).pipe(startWith(score))),
    );

    const window$ = race(played$, on$.pipe(delay(THRESHOLD), mapTo(NaN)));

    const score$ = window$.pipe(
        switchMap(score =>
            !score
                ? of(score)
                : animationFrame$.pipe(
                      map(() => {
                          // TODO: Think of a way to compute score without ClientRects each frame
                          const {bottom} = nativeElement.getBoundingClientRect();
                          const {
                              top,
                              height,
                          } = root.nativeElement.getBoundingClientRect();
                          const bar = top + (height * (100 - offset)) / 100;

                          return (bottom - bar) / injector.get(NoteDirective).duration;
                      }),
                      pairwise(),
                      map(([prev, cur]) => score * (cur - prev)),
                  ),
        ),
        takeUntil(destroy$),
        share(),
    );

    return new Observable(subscriber => score$.subscribe(subscriber));
}
