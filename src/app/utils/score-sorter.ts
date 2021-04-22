import {Score} from 'src/app/interfaces/score';

export function scoreSorter(a: Score, b: Score): number {
    return b.score - a.score;
}
