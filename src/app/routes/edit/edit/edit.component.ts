import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isPresent, tuiPure} from '@taiga-ui/cdk';
import {SONG_PARAM, TRACK_PARAM} from 'src/app/constants/query-params';
import {Hand} from 'src/app/enums/hand';
import {Note} from 'src/app/interfaces/note';
import {Song} from 'src/app/interfaces/song';
import {NOTES_RANGE_PROVIDER} from 'src/app/providers/notes-range';
import {SONG_PROVIDER} from 'src/app/providers/song';
import {CompositionsService} from 'src/app/services/compositions.service';
import {NOTES_RANGE} from 'src/app/tokens/notes-range';
import {SONG} from 'src/app/tokens/song';
import {TRACK} from 'src/app/tokens/track';
import {getTrackLength} from 'src/app/utils/get-track-length';
import {rangeToKeys} from 'src/app/utils/range-to-keys';

export function editTrackFactory({snapshot}: ActivatedRoute): readonly Note[] {
    return snapshot.data.song.tracks.get(snapshot.params[TRACK_PARAM] || 'Song');
}

@Component({
    selector: 'edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TRACK,
            deps: [ActivatedRoute],
            useFactory: editTrackFactory,
        },
        SONG_PROVIDER,
        NOTES_RANGE_PROVIDER,
    ],
})
export class EditComponent {
    active = NaN;
    tool: Hand.Left | Hand.Right | null = Hand.Left;

    readonly left = Hand.Left;
    readonly right = Hand.Right;
    readonly keys = rangeToKeys(this.range);
    readonly options = {updateOn: 'submit'};

    constructor(
        @Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
        @Inject(SONG) private readonly song: Song,
        @Inject(CompositionsService)
        private readonly compositionsService: CompositionsService,
        @Inject(Location) private readonly locationRef: Location,
        @Inject(NOTES_RANGE) private readonly range: [number, number],
        @Inject(TRACK) public track: readonly Note[],
    ) {}

    @tuiPure
    get max(): number {
        return getTrackLength(this.track);
    }

    get tempo(): number {
        return (this.song.tempo / 192) * 120;
    }

    set tempo(tempo: number) {
        this.song.tempo = (tempo / 120) * 192;
    }

    isActive(index: number): boolean {
        return index === this.active;
    }

    close() {
        this.active = NaN;
    }

    onClick(note: Note, active: number) {
        this.active = active;

        const {tool} = this;

        if (isPresent(tool)) {
            this.track = this.track.map(item =>
                item === note ? this.update(item, tool) : item,
            );
        } else {
            this.track = this.track.filter(item => item !== note);
        }
    }

    onKeyChange(note: Note, key: number) {
        this.track = this.track.map(item => (item === note ? {...note, key} : item));
    }

    onStartChange(note: Note, start: number) {
        this.track = this.track.map(item => (item === note ? {...note, start} : item));
    }

    onDurationChange(note: Note, duration: number) {
        this.track = this.track.map(item => (item === note ? {...note, duration} : item));
    }

    save() {
        const id = this.activatedRoute.snapshot.params[SONG_PARAM];
        const track = this.activatedRoute.snapshot.params[TRACK_PARAM];

        this.song.tracks.set(track, this.track);
        this.compositionsService.save(id, this.song).subscribe(() => {
            this.locationRef.back();
        });
    }

    private update({key, start, duration, finger}: Note, hand: Hand): Note {
        return {
            key,
            start,
            duration,
            finger,
            hand,
        };
    }
}
