import {Line} from 'src/app/interfaces/line';
import {Note} from 'src/app/interfaces/note';

// Cannot use ReadonlyMap because keyvalue pipe accepts Map
export interface Song {
    readonly tracks: Map<string, readonly Note[]>;
    readonly lyrics: readonly Line[];
    tempo: number;
}
