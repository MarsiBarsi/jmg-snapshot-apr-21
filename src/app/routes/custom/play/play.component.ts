import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Output,
} from '@angular/core';
import {MIDI_INPUTS} from '@ng-web-apis/midi';
import {Observable} from 'rxjs';
import {Settings} from 'src/app/interfaces/settings';
import {PLAY_PROVIDERS} from 'src/app/routes/custom/play/play.providers';
import {CALIBRATION} from 'src/app/tokens/calibration';
import {PREVIEW} from 'src/app/tokens/preview';
import {SETTINGS} from 'src/app/tokens/settings';

@Component({
    selector: 'play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: PLAY_PROVIDERS,
})
export class PlayComponent {
    @Output()
    readonly score = new EventEmitter<number>();

    constructor(
        @Inject(CALIBRATION) readonly calibration$: Observable<number>,
        @Inject(MIDI_INPUTS) readonly midiInputs$: Observable<readonly unknown[]>,
        @Inject(SETTINGS) private readonly settings: Settings,
        @Inject(PREVIEW) private readonly preview: boolean,
    ) {}

    get heading(): string {
        return this.preview ? 'Preview' : 'Calibration';
    }

    get c(): string {
        return this.settings.alteredLayout ? 'Q' : 'Z';
    }

    onScore(score: number) {
        this.score.emit(score);
    }
}
