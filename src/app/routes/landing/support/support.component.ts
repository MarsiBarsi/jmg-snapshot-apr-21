import MIDIAccess = WebMidi.MIDIAccess;

import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MIDI_ACCESS, MIDI_SUPPORT} from '@ng-web-apis/midi';

@Component({
    selector: 'support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent {
    readonly midiInputs$ = this.midiAccess
        .then(({inputs}) => !!inputs.size)
        .catch(() => false);

    constructor(
        @Inject(MIDI_SUPPORT) readonly midiSupport: boolean,
        @Inject(MIDI_ACCESS) private readonly midiAccess: Promise<MIDIAccess>,
    ) {}
}
