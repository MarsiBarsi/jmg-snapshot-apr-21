import {InjectionToken} from '@angular/core';

export const TRANSPOSITION = new InjectionToken<number>('Transposition in semitones', {
    factory: () => 0,
});
