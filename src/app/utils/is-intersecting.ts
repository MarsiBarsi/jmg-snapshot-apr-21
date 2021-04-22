export function isIntersecting([
    {boundingClientRect, rootBounds},
]: IntersectionObserverEntry[]): boolean {
    if (!rootBounds || !(boundingClientRect.width + boundingClientRect.height)) {
        return false;
    }

    return rootBounds.left
        ? Math.abs(boundingClientRect.left - rootBounds.left) < 50
        : Math.abs(boundingClientRect.bottom - rootBounds.bottom) < 50;
}
