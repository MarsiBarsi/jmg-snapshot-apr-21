import {Line} from './line';
import {Note} from './note';

export interface SongDTO {
    tempo: number;
    tracks: Record<string, readonly Note[]>;
    backingTrack?: string;
    lyrics?: readonly Line[];
}
