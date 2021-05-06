import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Inject,
    Output,
} from '@angular/core';
import {USER_AGENT} from '@ng-web-apis/common';
import {from, NEVER, Observable, of} from 'rxjs';
import {concatMap, delay, endWith, startWith} from 'rxjs/operators';
import {Settings} from 'src/app/interfaces/settings';
import {Song} from 'src/app/interfaces/song';
import {SING_PROVIDERS} from 'src/app/routes/custom/sing/sing.providers';
import {SETTINGS} from 'src/app/tokens/settings';
import {SONG} from 'src/app/tokens/song';

interface Lyric {
    index: number;
    line: readonly string[];
    duration: number;
}

@Component({
    selector: 'sing',
    templateUrl: './sing.template.html',
    styleUrls: ['./sing.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: SING_PROVIDERS,
})
export class SingComponent {
    @Output()
    readonly score = new EventEmitter<number>();

    readonly timing: number[] = [];

    readonly isSafari = /iPad|iPhone|iPod/.test(this.userAgent);

    private readonly song$ = from(this.song.lyrics).pipe(
        concatMap(({line, duration}, index) =>
            of(null).pipe(
                delay(duration),
                startWith([
                    {index, duration, line: line.split(' ')},
                    {index, duration, line: this.song.lyrics[index + 1]?.line.split(' ')},
                ]),
            ),
        ),
        endWith(null),
    );

    private started = false;

    constructor(
        @Inject(SETTINGS) readonly settings: Settings,
        @Inject(SONG) private readonly song: Song,
        @Inject(USER_AGENT) private readonly userAgent: string,
    ) {}

    get lyrics$(): Observable<Lyric[] | null> {
        return this.started ? this.song$ : NEVER;
    }

    onScore(score: number) {
        this.score.emit(score);
    }

    onStart() {
        this.started = true;
    }

    @HostListener('document:keydown.space')
    onSpace() {
        this.timing.push(performance.now());
    }

    @HostListener('document:keydown.enter')
    onEnter() {
        // tslint:disable-next-line:no-console
        console.log(
            this.timing.map((item, index, array) =>
                Math.round((array[index + 1] || Infinity) - item),
            ),
        );
    }
}
