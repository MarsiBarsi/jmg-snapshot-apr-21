import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {mustBePresent} from '@taiga-ui/cdk';
import {IMidiFile} from 'midi-json-parser-worker';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {Note} from 'src/app/interfaces/note';
import {Song} from 'src/app/interfaces/song';
import {User} from 'src/app/interfaces/user';
import {CompositionsService} from 'src/app/services/compositions.service';
import {USER} from 'src/app/tokens/user';
import {midiToSong} from 'src/app/utils/midi-to-song';

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
    file: File | null = null;

    parseError = false;

    song: Song | null = null;

    readonly form = new FormGroup({
        author: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        cover: new FormControl(''),
        thumbnail: new FormControl(''),
        buyLink: new FormControl(''),
        youtube: new FormControl(''),
    });

    private readonly selected = new Map<readonly Note[], boolean>();

    constructor(
        @Inject(USER) private readonly user$: Observable<User | null>,
        @Inject(CompositionsService)
        private readonly compositionsService: CompositionsService,
        @Inject(Router) private readonly router: Router,
    ) {}

    get premiumShow() {
        return this.form.value.publicAccess;
    }

    get submittable(): boolean {
        return this.form.valid && !!this.song;
    }

    get mergeable(): boolean {
        return this.selected.size > 1;
    }

    trackByNotes(_: number, {value}: {value: any}): any {
        return value;
    }

    merge() {
        if (!this.song) {
            return;
        }

        const {tracks} = this.song;
        const selected = [...this.selected.keys()];
        const keys = [...this.song.tracks.entries()]
            .filter(([_, value]) => selected.includes(value))
            .map(([key]) => key);
        const result = selected.reduce((acc, cur) => [...acc, ...cur], []);

        this.selected.clear();

        keys.forEach(key => tracks.delete(key));

        tracks.set(keys[0], result);
    }

    isSelected(notes: readonly Note[]): boolean {
        return this.selected.has(notes);
    }

    removeTrack(name: string) {
        if (this.song) {
            this.song.tracks.delete(name);
        }
    }

    onMidi(midi: IMidiFile | Error) {
        if (midi instanceof Error) {
            this.song = null;
            this.parseError = true;
        } else {
            this.parseError = false;
            this.song = midiToSong(midi);
        }
    }

    onSelectedChange(notes: readonly Note[]) {
        if (this.selected.has(notes)) {
            this.selected.delete(notes);
        } else {
            this.selected.set(notes, true);
        }
    }

    onTrackNameChange(oldName: string, newName: string) {
        if (!this.song || !this.song.tracks.has(oldName)) {
            return;
        }

        const notes = this.song.tracks.get(oldName)!;

        this.song.tracks.delete(oldName);
        this.song.tracks.set(newName, notes);
    }

    onFileChange(file: File | null) {
        if (file) {
            this.parseName(file);

            return;
        }

        this.song = null;
        this.parseError = false;
    }

    onSubmit() {
        const song = this.song;

        if (!song) {
            return;
        }

        this.user$
            .pipe(
                mustBePresent(),
                take(1),
                switchMap(({id}) =>
                    this.compositionsService.add(id, {...this.form.value}, {...song}),
                ),
            )
            .subscribe(result => {
                this.router.navigate([`/custom/${result}`]);
            });
    }

    private parseName(file: File) {
        const {name} = file;
        const index = name.lastIndexOf('.');
        const parsed = name.substring(0, index);
        const divider = parsed.includes('—') ? '—' : '-';
        const [author, title = ''] = parsed.split(divider);

        this.form.get('author')!.setValue(author.trim());
        this.form.get('title')!.setValue(title.trim());
    }
}
