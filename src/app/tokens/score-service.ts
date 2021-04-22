import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const SCORE_SERVICE = new InjectionToken<Observable<number>>('Score service');
