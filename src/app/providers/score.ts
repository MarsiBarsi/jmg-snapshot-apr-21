import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {SCORE_FACTORY} from '../tokens/score-factory';
import {SCORE_SERVICE} from '../tokens/score-service';
import {ScoreFactory} from '../type/score-factory';

export const SCORE_PROVIDER = {
    provide: SCORE_SERVICE,
    deps: [SCORE_FACTORY, Injector],
    useFactory: scoreServiceFactory,
};

export function scoreServiceFactory(
    factory: ScoreFactory,
    injector: Injector,
): Observable<number> {
    return factory(injector);
}
