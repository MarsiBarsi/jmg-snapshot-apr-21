// Rounds key to the beginning of the octave
export function octaveFloor(key: number): number {
    return key - (key % 12);
}
