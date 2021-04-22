export function objectifyMap<T>(map: Map<string, T>): Record<string, T> {
    const object: Record<string, T> = {};

    map.forEach((value, key) => {
        object[key] = value;
    });

    return object;
}
