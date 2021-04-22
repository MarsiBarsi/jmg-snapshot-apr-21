import {ANIMATION_FRAME} from '@ng-web-apis/common';
import {Observable} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';
import {OFFSET} from '../constants/offset';
import {Note} from '../interfaces/note';
import {CHUNKED} from '../tokens/chunked';
import {DURATION} from '../tokens/duration';
import {TRACK} from '../tokens/track';
import {getTrackLength} from '../utils/get-track-length';

export function chunkedFactory(
    track: readonly Note[],
    duration: number,
    animationFrame$: Observable<number>,
): Observable<readonly Note[]> {
    const length = getTrackLength(track) + OFFSET * 3;
    const chunks = Math.floor(length / OFFSET / 2);
    const chunked = Array.from({length: chunks}, (_, i) =>
        track.filter(
            ({start, duration}) =>
                start + duration > ((i - 2) * length) / chunks &&
                start < ((i + 2) * length) / chunks,
        ),
    );

    return animationFrame$.pipe(
        throttleTime((duration * 1000) / chunks),
        map((_, index) => chunked[index] || chunked[chunks - 1]),
    );
}

export const CHUNKED_PROVIDER = {
    provide: CHUNKED,
    deps: [TRACK, DURATION, ANIMATION_FRAME],
    useFactory: chunkedFactory,
};
