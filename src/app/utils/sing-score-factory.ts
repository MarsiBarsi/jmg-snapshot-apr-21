import {Injector} from '@angular/core';
import {IntersectionObserverService} from '@ng-web-apis/intersection-observer';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {filter, map, switchMapTo, take, takeUntil} from 'rxjs/operators';
import {NoteDirective} from 'src/app/components/note/note.directive';
import {PitchService} from 'src/app/routes/custom/sing/services/pitch.service';
import {FpsService} from 'src/app/services/fps.service';
import {isIntersecting} from 'src/app/utils/is-intersecting';

export const SCORE_PER_HIT = 23;

export function singScoreFactory(injector: Injector): Observable<number> {
    const fpsService = injector.get(FpsService);
    const destroy$ = injector.get(TuiDestroyService);
    const entries$ = injector.get(IntersectionObserverService);
    const pitch$ = injector.get(PitchService);
    const on$ = entries$.pipe(filter(isIntersecting), take(1));
    const score$ = on$.pipe(
        switchMapTo(pitch$.pipe(takeUntil(entries$))),
        filter(note => note === injector.get(NoteDirective).key),
        map(() => Math.round((SCORE_PER_HIT * 60) / fpsService.fps)),
        takeUntil(destroy$),
    );

    return new Observable(subscriber => score$.subscribe(subscriber));
}
