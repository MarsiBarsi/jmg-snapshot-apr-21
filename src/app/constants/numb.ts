import {Note} from 'src/app/interfaces/note';
import {Finger} from '../enums/finger';
import {Hand} from '../enums/hand';

export const NUMB: readonly Note[] = [
    {key: 57, start: 0, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 60, start: 48, duration: 48, finger: Finger.Index, hand: Hand.Right},
    {key: 57, start: 96, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 62, start: 144, duration: 144, finger: Finger.Middle, hand: Hand.Right},
    {key: 65, start: 288, duration: 144, finger: Finger.Pinky, hand: Hand.Right},
    {key: 64, start: 432, duration: 288, finger: Finger.Ring, hand: Hand.Right},
    {key: 57, start: 768, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 60, start: 816, duration: 48, finger: Finger.Index, hand: Hand.Right},
    {key: 57, start: 864, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 65, start: 912, duration: 144, finger: Finger.Pinky, hand: Hand.Right},
    {key: 64, start: 1056, duration: 144, finger: Finger.Ring, hand: Hand.Right},
    {key: 60, start: 1200, duration: 288, finger: Finger.Index, hand: Hand.Right},
    {key: 57, start: 1536, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 60, start: 1584, duration: 48, finger: Finger.Index, hand: Hand.Right},
    {key: 57, start: 1632, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 62, start: 1680, duration: 144, finger: Finger.Middle, hand: Hand.Right},
    {key: 65, start: 1824, duration: 144, finger: Finger.Pinky, hand: Hand.Right},
    {key: 64, start: 1968, duration: 288, finger: Finger.Ring, hand: Hand.Right},
    {key: 57, start: 2304, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 60, start: 2352, duration: 48, finger: Finger.Index, hand: Hand.Right},
    {key: 57, start: 2400, duration: 48, finger: Finger.Thumb, hand: Hand.Right},
    {key: 65, start: 2448, duration: 144, finger: Finger.Pinky, hand: Hand.Right},
    {key: 64, start: 2592, duration: 144, finger: Finger.Ring, hand: Hand.Right},
    {key: 60, start: 2736, duration: 288, finger: Finger.Index, hand: Hand.Right},
];
