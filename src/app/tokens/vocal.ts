import {InjectionToken} from '@angular/core';

export const VOCAL = new InjectionToken<boolean>('Flag for Karaoke mode', {
    factory: () => false,
});
