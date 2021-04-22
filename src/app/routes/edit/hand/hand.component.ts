import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Finger} from 'src/app/enums/finger';

@Component({
    selector: 'hand',
    templateUrl: './hand.component.html',
    styleUrls: ['./hand.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {
    @Input()
    finger?: Finger;

    @Input()
    palm = true;

    get thumb(): boolean {
        return this.finger === Finger.Thumb;
    }

    get index(): boolean {
        return this.finger === Finger.Index;
    }

    get middle(): boolean {
        return this.finger === Finger.Middle;
    }

    get ring(): boolean {
        return this.finger === Finger.Ring;
    }

    get pinky(): boolean {
        return this.finger === Finger.Pinky;
    }
}
