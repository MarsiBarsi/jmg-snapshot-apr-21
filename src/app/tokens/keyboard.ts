import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {DOCUMENT} from '@angular/common';
import {inject, InjectionToken} from '@angular/core';
import {PERFORMANCE} from '@ng-web-apis/common';
import {fromEvent, merge, Observable} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';
import {KEYBOARD_ID} from '../constants/keyboard-id';
import {KEYBOARD_LAYOUT_LEFT, KEYBOARD_LAYOUT_RIGHT} from '../constants/keyboard-layout';
import {Settings} from '../interfaces/settings';
import {SettingsService} from '../services/settings.service';

export const KEYBOARD = new InjectionToken<Observable<MIDIMessageEvent>>(
    'Keyboard emulation',
    {
        factory: () => {
            const performanceRef = inject(PERFORMANCE);
            const settings = inject(SettingsService);

            return merge(
                fromEvent<KeyboardEvent>(inject(DOCUMENT), 'keydown'),
                fromEvent<KeyboardEvent>(inject(DOCUMENT), 'keyup'),
            ).pipe(
                filter(
                    ({repeat, code}) => !repeat && !!getLayout(settings.settings)[code],
                ),
                map(event => ({
                    ...event,
                    timeStamp: performanceRef.now(),
                    receivedTime: performanceRef.now(),
                    target: Object.assign({}, event.target, {
                        id: KEYBOARD_ID,
                        name: KEYBOARD_ID,
                    }),
                    data: new Uint8Array([
                        144,
                        getLayout(settings.settings)[event.code],
                        event.type === 'keydown' ? 100 : 0,
                    ]),
                })),
                share(),
            );
        },
    },
);

function getLayout({alteredLayout}: Settings): Record<string, number> {
    return alteredLayout ? KEYBOARD_LAYOUT_RIGHT : KEYBOARD_LAYOUT_LEFT;
}
