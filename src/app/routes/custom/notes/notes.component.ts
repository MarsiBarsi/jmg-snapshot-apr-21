import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Inject,
    Output,
    ViewChild,
} from '@angular/core';
import {AUDIO_WORKLET_PROCESSORS_READY} from '@ng-web-apis/audio';
import {shouldCall} from '@tinkoff/ng-event-plugins';
import {Observable, of} from 'rxjs';
import {delay, filter, map, scan, startWith} from 'rxjs/operators';
import {TvComponent} from 'src/app/components/tv/tv.component';
import {OFFSET} from 'src/app/constants/offset';
import {Composition} from 'src/app/interfaces/composition';
import {Note} from 'src/app/interfaces/note';
import {Settings} from 'src/app/interfaces/settings';
import {NOTES_PROVIDERS} from 'src/app/routes/custom/notes/notes.providers';
import {AudioService} from 'src/app/services/audio.service';
import {CALIBRATED} from 'src/app/tokens/calibrated';
import {CHUNKED} from 'src/app/tokens/chunked';
import {COMPOSITION} from 'src/app/tokens/composition';
import {DURATION} from 'src/app/tokens/duration';
import {NOTES_RANGE} from 'src/app/tokens/notes-range';
import {PLAYBACK_RATE} from 'src/app/tokens/playback-rate';
import {PREVIEW} from 'src/app/tokens/preview';
import {SCORE} from 'src/app/tokens/score';
import {SETTINGS} from 'src/app/tokens/settings';
import {TRACK} from 'src/app/tokens/track';
import {TRANSPOSITION} from 'src/app/tokens/transposition';
import {VOCAL} from 'src/app/tokens/vocal';
import {getTrack} from 'src/app/utils/get-track';
import {getTrackLength} from 'src/app/utils/get-track-length';
import {isCurrentTarget} from 'src/app/utils/is-current-target';
import {rangeToKeys} from 'src/app/utils/range-to-keys';
import {semitonesToFactor} from 'src/app/utils/semitones-to-factor';

@Component({
    selector: 'notes',
    templateUrl: './notes.template.html',
    styleUrls: ['./notes.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: NOTES_PROVIDERS,
})
export class NotesComponent {
    @Output()
    readonly end = new EventEmitter<number>();

    @Output()
    readonly start = new EventEmitter<void>();

    playing = false;

    readonly keys = rangeToKeys(this.range);

    readonly currentScore$ = this.score$.pipe(
        scan((score, value) => score + (value || 0), 0),
        map(score => Math.round(score)),
        startWith(0),
    );

    readonly transform$ = of(
        `translate3d(0, ${getTrackLength(this.track) + 2 * OFFSET}px, 0)`,
    ).pipe(delay(0), startWith(`translate3d(0, -${OFFSET}px, 0)`));

    readonly src = getTrack(this.composition);

    readonly youtube = this.composition.youtube;

    readonly pitchFactor = semitonesToFactor(this.transposition);

    readonly audio = this.pitchFactor === 1;

    readonly buffer$ = this.audioService
        .fetch(this.src)
        .pipe(filter(result => typeof result !== 'number'));

    @ViewChild(TvComponent)
    private readonly tv?: TvComponent;

    constructor(
        @Inject(PLAYBACK_RATE) readonly playbackRate: number,
        @Inject(AUDIO_WORKLET_PROCESSORS_READY) readonly processors$: Promise<boolean>,
        @Inject(PREVIEW) readonly preview: boolean,
        @Inject(DURATION) readonly duration: number,
        @Inject(SETTINGS) readonly settings: Settings,
        @Inject(CALIBRATED) readonly notes$: Observable<Map<number, number | null>>,
        @Inject(CHUNKED) readonly chunked$: Observable<readonly Note[]>,
        @Inject(VOCAL) readonly vocal: boolean,
        @Inject(AudioService) private readonly audioService: AudioService,
        @Inject(TRACK) private readonly track: readonly Note[],
        @Inject(SCORE) private readonly score$: Observable<number>,
        @Inject(NOTES_RANGE) private readonly range: [number, number],
        @Inject(COMPOSITION) private readonly composition: Composition,
        @Inject(TRANSPOSITION) private readonly transposition: number,
    ) {}

    getOpacity(key: number, map: Map<number, number>): number | null {
        return Number(map.get(key)) || null;
    }

    @shouldCall(isCurrentTarget)
    @HostListener('init.onTransitionEnd', ['$event'])
    onTransitionEnd(_: Event, score: number) {
        this.end.emit(score);
    }

    onIntersection() {
        this.playing = true;
        this.start.emit();

        if (!this.tv || !this.tv.player) {
            return;
        }

        this.tv.player.setPlaybackRate(this.vocal ? 1 : this.playbackRate);
        this.tv.player.playVideo();
    }

    onStateChange({target}: YT.OnStateChangeEvent) {
        if (!this.playing) {
            target.pauseVideo();
        }
    }
}
