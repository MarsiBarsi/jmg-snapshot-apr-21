import {InjectionToken} from '@angular/core';
import {Composition} from '../interfaces/composition';

export const COMPOSITIONS = new InjectionToken<readonly Composition[]>(
    'Compositions list',
);
