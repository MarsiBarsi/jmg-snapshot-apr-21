import {Finger} from '../enums/finger';

export function fingerToColor(finger: Finger): string {
    switch (finger) {
        case Finger.Thumb:
            return 'var(--color-thumb)';
        case Finger.Index:
            return 'var(--color-index)';
        case Finger.Middle:
            return 'var(--color-middle)';
        case Finger.Ring:
            return 'var(--color-ring)';
        case Finger.Pinky:
            return 'var(--color-pinky)';
    }
}
