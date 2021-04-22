import {Song} from '../interfaces/song';
import {CHOP} from '../tokens/chop';
import {SONG} from '../tokens/song';

export function chopFactory({tempo}: Song): number {
    return tempo / 32;
}

export const CHOP_PROVIDER = {
    provide: CHOP,
    deps: [SONG],
    useFactory: chopFactory,
};
