import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const CALIBRATION = new InjectionToken<Observable<number>>(
    'Calibration stream of lowest C offset',
);
