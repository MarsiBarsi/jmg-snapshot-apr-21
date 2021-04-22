import {InjectionToken, Type} from '@angular/core';
import {AbstractInstrument} from '../instruments/instrument';
import {RetrowaveComponent} from '../instruments/retrowave/retrowave.component';

export const INSTRUMENT = new InjectionToken<Type<AbstractInstrument>>(
    'An instrument to play',
    {
        factory: () => RetrowaveComponent,
    },
);
