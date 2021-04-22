import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {MIDI_INPUTS} from '@ng-web-apis/midi';
import {Observable, of} from 'rxjs';
import {filter, map, shareReplay, switchMap, take} from 'rxjs/operators';
import {CALIBRATION} from '../tokens/calibration';
import {NOTES} from '../tokens/notes';
import {NOTES_RANGE} from '../tokens/notes-range';
import {isC} from '../utils/is-c';

export function calibrationFactory(
    midiInputs$: Observable<readonly unknown[]>,
    messages$: Observable<MIDIMessageEvent>,
    [start]: [number, number],
): Observable<number> {
    return midiInputs$.pipe(
        switchMap(({length}) =>
            length
                ? messages$.pipe(
                      filter(isC),
                      map(({data}) => start - data[1]),
                  )
                : of(start - 36), // 36 - lowest key
        ),
        take(1),
        shareReplay({bufferSize: 1, refCount: true}),
    );
}

export const CALIBRATION_PROVIDER = {
    provide: CALIBRATION,
    deps: [MIDI_INPUTS, NOTES, NOTES_RANGE],
    useFactory: calibrationFactory,
};
