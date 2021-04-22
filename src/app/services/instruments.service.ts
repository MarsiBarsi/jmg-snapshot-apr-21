import {Injectable, Type} from '@angular/core';
import {Instrument} from '../enums/instrument';
import {AbstractInstrument} from '../instruments/instrument';
import {PianoComponent} from '../instruments/piano/piano.component';
import {RetrowaveComponent} from '../instruments/retrowave/retrowave.component';

@Injectable({
    providedIn: 'root',
})
export class InstrumentsService {
    private readonly instruments = new Map<Instrument, Type<AbstractInstrument>>([
        [Instrument.Retrowave, RetrowaveComponent],
        [Instrument.Piano, PianoComponent],
    ]);

    getInstrument(name: Instrument): Type<AbstractInstrument> {
        return this.instruments.get(name) || RetrowaveComponent;
    }
}
