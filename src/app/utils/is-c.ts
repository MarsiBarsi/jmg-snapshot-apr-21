import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

export function isC({data}: MIDIMessageEvent): boolean {
    return !(data[1] % 12);
}
