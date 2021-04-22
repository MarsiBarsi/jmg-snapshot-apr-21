import {InjectionToken} from '@angular/core';
import {from, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

declare function Aubio(): Promise<any>;

export const AUBIO = new InjectionToken<Observable<any>>(
    'Promise for pitch detector from aubio',
    {
        factory: () => from(Aubio()).pipe(shareReplay(1)),
    },
);
