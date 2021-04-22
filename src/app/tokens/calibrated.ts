import {InjectionToken} from '@angular/core';
import {NEVER, Observable} from 'rxjs';

export const CALIBRATED = new InjectionToken<Observable<Map<number, number>>>(
    'A map of calibrated played notes',
    {
        factory: () => NEVER,
    },
);
