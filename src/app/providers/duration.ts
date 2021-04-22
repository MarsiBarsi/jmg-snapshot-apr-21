import {OFFSET} from 'src/app/constants/offset';
import {Note} from '../interfaces/note';
import {DURATION} from '../tokens/duration';
import {TEMPO} from '../tokens/tempo';
import {TRACK} from '../tokens/track';
import {getTrackLength} from '../utils/get-track-length';

export function durationFactory(track: readonly Note[], tempo: number): number {
    return (getTrackLength(track) + 3 * OFFSET) / tempo;
}

export const DURATION_PROVIDER = {
    provide: DURATION,
    deps: [TRACK, TEMPO],
    useFactory: durationFactory,
};
