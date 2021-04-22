import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Input,
} from '@angular/core';
import {Finger} from '../../enums/finger';
import {Hand} from '../../enums/hand';
import {CHOP} from '../../tokens/chop';
import {NOTES_RANGE} from '../../tokens/notes-range';
import {fingerToColor} from '../../utils/finger-to-color';

@Component({
    selector: 'note',
    template: '',
    styleUrls: ['./note.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
    @Input()
    finger = Finger.Middle;

    @Input()
    hand = Hand.Right;

    @Input()
    fingers = false;

    @Input()
    key = 0;

    @Input()
    @HostBinding('style.bottom.px')
    start = 0;

    @Input()
    duration = 0;

    constructor(
        @Inject(CHOP) private readonly chop: number,
        @Inject(NOTES_RANGE) private readonly range: [number, number],
    ) {}

    @HostBinding('class._black')
    get black(): boolean {
        const remainder = this.key % 12;

        return (
            remainder === 1 ||
            remainder === 3 ||
            remainder === 6 ||
            remainder === 8 ||
            remainder === 10
        );
    }

    @HostBinding('style.height.px')
    get height(): number {
        return this.duration - this.chop;
    }

    @HostBinding('style.color')
    get color(): string {
        const handToFinger = this.hand === Hand.Right ? Finger.Index : Finger.Pinky;

        return fingerToColor(this.fingers ? this.finger : handToFinger);
    }

    @HostBinding('style.left.%')
    get left(): number {
        return (this.key - this.range[0]) * this.percent;
    }

    @HostBinding('style.width.%')
    get width(): number {
        return this.black ? this.percent / 1.5 : this.percent;
    }

    private get percent(): number {
        return 100 / (this.range[1] - this.range[0]);
    }
}
