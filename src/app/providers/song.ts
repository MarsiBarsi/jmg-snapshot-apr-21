import {ActivatedRoute} from '@angular/router';
import {Song} from 'src/app/interfaces/song';
import {SONG} from '../tokens/song';

export function songFactory({snapshot}: ActivatedRoute): Song {
    return snapshot.data.song;
}

export const SONG_PROVIDER = {
    provide: SONG,
    deps: [ActivatedRoute],
    useFactory: songFactory,
};
