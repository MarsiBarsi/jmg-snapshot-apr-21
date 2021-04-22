import {Note} from '../interfaces/note';
import {NOTES_RANGE} from '../tokens/notes-range';
import {TRACK} from '../tokens/track';
import {octaveCeil} from '../utils/octave-ceil';
import {octaveFloor} from '../utils/octave-floor';

export function notesRangeFactory(track: readonly Note[]): [number, number] {
    const min = track.reduce((acc, {key}) => Math.min(acc, key), 999);
    const max = track.reduce((acc, {key}) => Math.max(acc, key), 0);

    return [octaveFloor(min), Math.max(octaveCeil(max), octaveFloor(min) + 12 * 2)];
}

export const NOTES_RANGE_PROVIDER = {
    provide: NOTES_RANGE,
    deps: [TRACK],
    useFactory: notesRangeFactory,
};
