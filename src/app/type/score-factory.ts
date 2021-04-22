import {Injector} from '@angular/core';
import {Observable} from 'rxjs';

export type ScoreFactory = (injector: Injector) => Observable<number>;
