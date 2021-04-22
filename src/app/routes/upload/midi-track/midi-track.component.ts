import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
} from '@angular/core';
import {tuiPure} from '@taiga-ui/cdk';
import {Hand} from 'src/app/enums/hand';
import {Note} from 'src/app/interfaces/note';
import {getTrackLength} from 'src/app/utils/get-track-length';

const SCALE = 3;
const OFFSET = 24;
const CANVAS_HEIGHT = 88 * SCALE;
const CANVAS_WIDTH = 500;

@Component({
    selector: 'midi-track',
    templateUrl: './midi-track.component.html',
    styleUrls: ['./midi-track.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MidiTrackComponent {
    @Input()
    name = '';

    @Input()
    notes: readonly Note[] = [];

    @Output()
    nameChange = new EventEmitter<string>();

    @HostBinding('class._preview')
    preview = false;

    readonly scale = SCALE;

    readonly width = CANVAS_WIDTH;

    readonly height = CANVAS_HEIGHT;

    @tuiPure
    get duration(): number {
        return getTrackLength(this.notes);
    }

    get previewIcon(): string {
        return this.preview ? 'tuiIconEyeClosed' : 'tuiIconEyeOpen';
    }

    get handIcon(): string {
        return this.notes[0].hand === Hand.Left ? 'tuiIconArrowLeft' : 'tuiIconArrowRight';
    }

    getX(x: number): number {
        return (x / this.duration) * this.width;
    }

    getY(key: number): number {
        return this.height - (key - OFFSET) * this.scale - this.scale;
    }

    onNameChange(name: string) {
        this.name = name;
        this.nameChange.emit(name);
    }

    togglePreview() {
        this.preview = !this.preview;
    }

    toggleHand() {
        this.notes.forEach(
            // @ts-ignore TMNT
            note => (note.hand = note.hand === Hand.Left ? Hand.Right : Hand.Left),
        );
    }
}
