import {THRESHOLD} from '../constants/threshold';

export function timeToScore(time: number): number {
    if (time < THRESHOLD / 5) {
        return 300;
    }

    if (time < THRESHOLD / 2) {
        return 150;
    }

    if (time < THRESHOLD) {
        return 50;
    }

    return 0;
}
