import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';

export const POINTER = new InjectionToken<Subject<MIDIMessageEvent>>(
    'A stream of notes played with pointer',
    {
        factory: () => new Subject<MIDIMessageEvent>(),
    },
);
