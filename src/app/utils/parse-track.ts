import {TMidiEvent} from 'midi-json-parser-worker';
import {Finger} from '../enums/finger';
import {Hand} from '../enums/hand';
import {Note} from '../interfaces/note';
import {isNoteOff} from './is-note-off';
import {isNoteOn} from './is-note-on';

export function parseTrack(track: TMidiEvent[], correction: number): readonly Note[] {
    const result: Note[] = [];
    let notes: Note[] = [];
    let ticks = 0;

    track.forEach(event => {
        ticks += event.delta;

        // TODO: Consider noteOn with 0 velocity case
        if (isNoteOff(event)) {
            const note = notes.find(item => item.key === event.noteOff.noteNumber);

            if (note) {
                notes = [...notes.filter(item => item !== note)];

                result.push({
                    key: note.key,
                    start: note.start * correction,
                    duration: (ticks - note.start) * correction,
                    finger: Finger.Middle,
                    hand: Hand.Right,
                });
            }
        } else if (isNoteOn(event)) {
            notes.push({
                key: event.noteOn.noteNumber,
                start: ticks,
                duration: 0,
                finger: Finger.Middle,
                hand: Hand.Right,
            });
        }
    });

    return result;
}
