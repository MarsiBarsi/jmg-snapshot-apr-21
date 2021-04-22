import {IMidiNoteOnEvent, TMidiEvent} from 'midi-json-parser-worker';

export function isNoteOn(event: TMidiEvent): event is IMidiNoteOnEvent {
    return !!event.noteOn;
}
