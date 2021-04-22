import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const PRELOAD = new InjectionToken<Observable<readonly number[]>>(
    'Arrays of keys to load beforehand',
);
