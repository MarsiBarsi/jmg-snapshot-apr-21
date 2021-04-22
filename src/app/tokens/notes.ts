import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {inject, InjectionToken} from '@angular/core';
import {MIDI_MESSAGES, notes} from '@ng-web-apis/midi';
import {EMPTY, merge, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {KEYBOARD} from './keyboard';
import {POINTER} from './pointer';

export const NOTES = new InjectionToken<Observable<MIDIMessageEvent>>('Played notes', {
    providedIn: 'root',
    factory: () =>
        merge(
            inject(MIDI_MESSAGES).pipe(catchError(() => EMPTY)),
            inject(KEYBOARD),
            inject(POINTER),
        ).pipe(notes()),
});
