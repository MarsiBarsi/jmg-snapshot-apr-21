import {IMidiSetTempoEvent, TMidiEvent} from 'midi-json-parser-worker';

export function isSetTempo(event: TMidiEvent): event is IMidiSetTempoEvent {
    return !!event.setTempo;
}
