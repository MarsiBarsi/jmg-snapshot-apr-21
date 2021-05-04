import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

const NOTES_PER_OCTAVE = 12;

export function isC({data}: MIDIMessageEvent): boolean {
    return !(data[1] % NOTES_PER_OCTAVE);
}
