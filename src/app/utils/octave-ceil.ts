// Rounds key to the end of the octave
export function octaveCeil(key: number): number {
    return Math.ceil(key / 12) * 12;
}
