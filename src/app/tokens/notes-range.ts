import {InjectionToken} from '@angular/core';

export const NOTES_RANGE = new InjectionToken<[number, number]>(
    'Notes range for composition',
);
