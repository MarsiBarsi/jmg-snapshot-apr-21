import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {toData} from '@ng-web-apis/midi';
import {Observable} from 'rxjs';
import {scan, shareReplay, startWith, withLatestFrom} from 'rxjs/operators';
import {CALIBRATED} from '../tokens/calibrated';
import {CALIBRATION} from '../tokens/calibration';
import {NOTES} from '../tokens/notes';

export function calibratedFactory(
    messages$: Observable<MIDIMessageEvent>,
    offset$: Observable<number>,
): Observable<Map<number, number | null>> {
    return messages$.pipe(
        toData(),
        withLatestFrom<Uint8Array, Observable<number>, [number, number]>(
            offset$,
            ([_, key, volume], offset) => [key + offset, volume],
        ),
        scan((map, [key, volume]) => {
            if (!volume) {
                map.delete(key);

                return new Map(map);
            } else {
                return new Map(map.set(key, volume / 256));
            }
        }, new Map()),
        startWith(new Map()),
        shareReplay(1),
    );
}

export const CALIBRATED_PROVIDER = {
    provide: CALIBRATED,
    deps: [NOTES, CALIBRATION],
    useFactory: calibratedFactory,
};
