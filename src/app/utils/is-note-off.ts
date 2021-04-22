import {IMidiNoteOffEvent, TMidiEvent} from 'midi-json-parser-worker';

export function isNoteOff(event: TMidiEvent): event is IMidiNoteOffEvent {
    return !!event.noteOff;
}
