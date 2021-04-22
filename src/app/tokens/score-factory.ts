import {InjectionToken} from '@angular/core';
import {ScoreFactory} from '../type/score-factory';

export const SCORE_FACTORY = new InjectionToken<ScoreFactory>('Score service factory');
