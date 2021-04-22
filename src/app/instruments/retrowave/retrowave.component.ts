import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractInstrument} from '../instrument';

@Component({
    selector: 'retrowave',
    templateUrl: './retrowave.component.html',
    styles: [':host { display: none }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetrowaveComponent extends AbstractInstrument {
    toBuffer(): string {
        return '';
    }
}
