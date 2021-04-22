import {InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';

export const SCORE = new InjectionToken<Subject<number>>('Score stream');
