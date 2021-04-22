import {Note} from 'src/app/interfaces/note';

export function getTrackLength(track: readonly Note[]): number {
    return track.reduce(
        (max, {start, duration}) => (start + duration > max ? start + duration : max),
        0,
    );
}
