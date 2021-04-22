export function parseRecord<T>(record: Record<string, T>): Map<string, T> {
    const map = new Map();

    for (const [key, value] of Object.entries(record)) {
        map.set(key, value);
    }

    return map;
}
