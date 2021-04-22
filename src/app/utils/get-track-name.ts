import {IMidiTextEvent, IMidiTrackNameEvent, TMidiEvent} from 'midi-json-parser-worker';

export function getTrackName(track: TMidiEvent[], index: number): string {
    const {trackName} =
        track.find((event): event is IMidiTrackNameEvent => !!event.trackName) || {};
    const {text} = track.find((event): event is IMidiTextEvent => !!event.text) || {};

    return trackName || text || `Track #${index}`;
}
