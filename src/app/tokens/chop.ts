import {InjectionToken} from '@angular/core';

export const CHOP = new InjectionToken<number>('A safe limiter of notes length', {
    factory: () => 0,
});
