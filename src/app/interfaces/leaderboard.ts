import {Mode} from 'src/app/enums/mode';
import {Score} from 'src/app/interfaces/score';

export interface Leaderboard {
    [Mode.Playing]: readonly Score[];
    [Mode.Singing]: readonly Score[];
}
