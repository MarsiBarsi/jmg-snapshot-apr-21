import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {ChangeDetectionStrategy, Component, Inject, Type} from '@angular/core';
import {PERFORMANCE} from '@ng-web-apis/common';
import {MIDI_INPUTS} from '@ng-web-apis/midi';
import {Observable, Subject} from 'rxjs';
import {
    KEYBOARD_LAYOUT,
    KEYBOARD_LAYOUT_ALTERED,
} from 'src/app/constants/keyboard-layout';
import {POINTER_ID} from 'src/app/constants/pointer-id';
import {AbstractInstrument} from 'src/app/instruments/instrument';
import {Settings} from 'src/app/interfaces/settings';
import {CALIBRATED} from 'src/app/tokens/calibrated';
import {INSTRUMENT} from 'src/app/tokens/instrument';
import {NOTES_RANGE} from 'src/app/tokens/notes-range';
import {POINTER} from 'src/app/tokens/pointer';
import {SETTINGS} from 'src/app/tokens/settings';
import {rangeToKeys} from 'src/app/utils/range-to-keys';

@Component({
    selector: 'keyboard',
    templateUrl: './keyboard.template.html',
    styleUrls: ['./keyboard.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent {
    readonly keys = rangeToKeys(this.range);

    constructor(
        @Inject(INSTRUMENT) readonly instrument: Type<AbstractInstrument>,
        @Inject(CALIBRATED) readonly notes$: Observable<Map<number, number | null>>,
        @Inject(MIDI_INPUTS) readonly midiInputs$: Observable<readonly unknown[]>,
        @Inject(NOTES_RANGE) private readonly range: [number, number],
        @Inject(SETTINGS) private readonly settings: Settings,
        @Inject(PERFORMANCE) private readonly performanceRef: Performance,
        @Inject(POINTER) private readonly pointer$: Subject<MIDIMessageEvent>,
    ) {}

    isActive(notes: Map<number, number>, key: number): boolean {
        return !!notes.get(key);
    }

    getLetter(length: number, index: number): string {
        if (length) {
            return '';
        }

        return this.settings.alteredLayout
            ? KEYBOARD_LAYOUT_ALTERED[index]
            : KEYBOARD_LAYOUT[index];
    }

    onPointer(event: TouchEvent, key: number) {
        this.pointer$.next({
            ...event,
            timeStamp: this.performanceRef.now(),
            receivedTime: this.performanceRef.now(),
            target: Object.assign({}, event.target, {
                id: POINTER_ID,
                name: POINTER_ID,
            }),
            data: new Uint8Array([144, key, event.type === 'touchstart' ? 100 : 0]),
        });
    }
}
