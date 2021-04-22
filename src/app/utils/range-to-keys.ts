export function rangeToKeys([start, end]: [number, number]): readonly number[] {
    return Array.from({length: end - start}, (_, i) => i + start);
}
