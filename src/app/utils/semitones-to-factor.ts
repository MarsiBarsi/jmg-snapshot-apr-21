import {inRange} from '@taiga-ui/cdk';

export function semitonesToFactor(semitones: number): number {
    const normalized = inRange(semitones, -6, 6)
        ? semitones
        : (Math.abs(semitones) - 12) * Math.sign(semitones);

    return 2 ** (normalized / 12);
}
