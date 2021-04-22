import {concat, Observable, timer} from 'rxjs';
import {map, mapTo, startWith} from 'rxjs/operators';
import {Note} from '../interfaces/note';
import {CALIBRATION} from '../tokens/calibration';
import {PRELOAD} from '../tokens/preload';
import {TRACK} from '../tokens/track';

export function preloadFactory(
    offset$: Observable<number>,
    track: readonly Note[],
): Observable<readonly number[]> {
    return concat(
        offset$.pipe(
            map(offset =>
                track
                    .map(({key}) => key + offset)
                    .filter((url, index, array) => array.indexOf(url) === index),
            ),
            startWith(Array.from({length: 7}, (_, i) => i * 12 + 24)),
        ),
        timer(5000).pipe(mapTo(Array.from({length: 85}, (_, i) => i + 24))),
    );
}

export const PRELOAD_PROVIDER = {
    provide: PRELOAD,
    deps: [CALIBRATION, TRACK],
    useFactory: preloadFactory,
};
