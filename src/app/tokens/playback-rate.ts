import {InjectionToken} from '@angular/core';

export const PLAYBACK_RATE = new InjectionToken<number>('Playback rate', {
    factory: () => 1,
});
