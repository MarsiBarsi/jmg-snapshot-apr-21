import {IMidiFile, IMidiSetTempoEvent} from 'midi-json-parser-worker';
import {Note} from 'src/app/interfaces/note';
import {Song} from 'src/app/interfaces/song';
import {getTrackName} from './get-track-name';
import {isNoteOff} from './is-note-off';
import {isNoteOn} from './is-note-on';
import {isSetTempo} from './is-set-tempo';
import {parseTrack} from './parse-track';

const TEMPO_THRESHOLD = 200;

export function midiToSong(midi: IMidiFile): Song {
    const pixelsPerBeat = midi.division;
    const setTempoEvent = midi.tracks[0].find<IMidiSetTempoEvent>(isSetTempo);
    const beatDuration = setTempoEvent
        ? setTempoEvent.setTempo.microsecondsPerQuarter / 1000000
        : 0.5;
    const tempo = pixelsPerBeat / beatDuration;
    const correction = tempo > TEMPO_THRESHOLD ? TEMPO_THRESHOLD / tempo : 1;
    const tracks = new Map(
        midi.tracks
            .filter(track => track.some(event => isNoteOn(event) || isNoteOff(event)))
            .map<[string, readonly Note[]]>((track, index) => [
                getTrackName(track, index),
                parseTrack(track, correction),
            ]),
    );

    return {
        tracks,
        tempo: tempo * correction,
        lyrics: [],
    };
}
