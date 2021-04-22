import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractInstrument} from '../instrument';

@Component({
    selector: 'piano',
    templateUrl: './piano.component.html',
    styles: [':host { display: block; color: white }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PianoComponent extends AbstractInstrument {
    toBuffer(key: number): string {
        return `assets/audio/piano/${key}.ogg`;
    }
}
