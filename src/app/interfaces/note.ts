import {Finger} from 'src/app/enums/finger';
import {Hand} from 'src/app/enums/hand';

export interface Note {
    readonly key: number;
    readonly start: number;
    readonly duration: number;
    readonly finger: Finger;
    readonly hand: Hand;
}
