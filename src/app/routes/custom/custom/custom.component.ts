import {isPlatformBrowser} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Injector,
    PLATFORM_ID,
} from '@angular/core';
import {AngularFireAnalytics} from '@angular/fire/analytics';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MEDIA_STREAM} from '@ng-web-apis/audio';
import {PAGE_VISIBILITY} from '@ng-web-apis/common';
import {isPresent, px, tuiPure, TUI_IS_MOBILE} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {merge, Observable, Subject, timer} from 'rxjs';
import {mapTo, startWith, switchMapTo, tap} from 'rxjs/operators';
import {Mode} from 'src/app/enums/mode';
import {Composition} from 'src/app/interfaces/composition';
import {AUDIO, CUSTOM_PROVIDERS} from 'src/app/routes/custom/custom/custom.providers';
import {LeaderboardComponent} from 'src/app/routes/custom/leaderboard/leaderboard.component';
import {ScoreComponent} from 'src/app/routes/custom/score/score.component';
import {LeaderboardService} from 'src/app/services/leaderboard.service';
import {COMPOSITION} from 'src/app/tokens/composition';

@Component({
    selector: 'custom',
    templateUrl: './custom.template.html',
    styleUrls: ['./custom.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: CUSTOM_PROVIDERS,
    host: {
        '[class._mobile]': 'isMobile',
    },
})
export class CustomComponent {
    private readonly retrigger$ = new Subject<void>();

    private readonly mode$ = new Subject<Mode | null>();

    @HostBinding('class._animated')
    readonly animated = this.router.navigated;

    constructor(
        @Inject(TUI_IS_MOBILE) readonly isMobile: boolean,
        @Inject(AUDIO) readonly audio$: Observable<number | AudioBuffer>,
        @Inject(MEDIA_STREAM) readonly stream: unknown,
        @Inject(COMPOSITION) private readonly composition: Composition,
        @Inject(PAGE_VISIBILITY) private readonly visible$: Observable<boolean>,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(AngularFireAnalytics) private readonly analytics: AngularFireAnalytics,
        @Inject(Injector) private readonly injector: Injector,
        @Inject(Router) private readonly router: Router,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        @Inject(LeaderboardService)
        private readonly leaderboardService: LeaderboardService,
        @Inject(Meta) meta: Meta,
        @Inject(Title) title: Title,
    ) {
        this.logSong('open_song');

        const content = `${this.title} on Jamigo`;

        meta.updateTag({content}, 'property="og:title"');
        meta.updateTag({content}, 'name="twitter:title"');
        meta.updateTag({content: this.composition.cover}, 'property="og:image"');
        meta.updateTag({content: this.composition.cover}, 'name="twitter:image"');
        title.setTitle(content);
    }

    @HostBinding('style.backgroundImage')
    get backgroundImage(): string {
        return `linear-gradient(45deg, #21213c, rgba(33, 33, 60, 0.5)), ${this.background}`;
    }

    get background(): string {
        return `url(${this.composition.cover})`;
    }

    get buy(): string {
        return this.composition.buyLink;
    }

    get title(): string {
        return `${this.composition.author} — ${this.composition.title}`;
    }

    @tuiPure
    get refresh$(): Observable<boolean> {
        return this.retrigger$.pipe(
            switchMapTo(timer(100).pipe(mapTo(true), startWith(false))),
            startWith(true),
        );
    }

    @tuiPure
    get current$(): Observable<Mode | null> {
        return merge(
            this.mode$.pipe(startWith(null)),
            this.visible$.pipe(mapTo(null)),
        ).pipe(
            tap(mode => {
                this.elementRef.nativeElement.classList.toggle(
                    '_playing',
                    isPresent(mode),
                );

                if (isPresent(mode)) {
                    const {
                        width,
                        height,
                    } = this.elementRef.nativeElement.getBoundingClientRect();

                    this.elementRef.nativeElement.style.width = px(width);
                    this.elementRef.nativeElement.style.height = px(height);
                } else {
                    this.elementRef.nativeElement.style.width = '';
                    this.elementRef.nativeElement.style.height = '';
                }
            }),
        );
    }

    onRestart() {
        this.retrigger$.next();
    }

    onPlay() {
        this.mode$.next(Mode.Playing);
    }

    onSing() {
        this.mode$.next(Mode.Singing);
    }

    onBack() {
        this.mode$.next(null);
    }

    onBuy() {
        this.logSong('buy_song');
    }

    onLeaderboard() {
        this.dialogService
            .open(new PolymorpheusComponent(LeaderboardComponent, this.injector))
            .subscribe();
    }

    onScore(score: number, mode: Mode) {
        this.leaderboardService
            .saveScore(this.composition.id, score, mode)
            .pipe(
                switchMapTo(
                    this.dialogService.open(
                        new PolymorpheusComponent(ScoreComponent, this.injector),
                        {
                            label: 'Congratulations',
                            data: {
                                score,
                                mode,
                                title: this.title,
                            },
                        },
                    ),
                ),
            )
            .subscribe({
                complete: () => this.onBack(),
            });
    }

    isMenu(mode: Mode): boolean {
        return !isPresent(mode);
    }

    isPlay(mode: Mode | null): boolean {
        return mode === Mode.Playing;
    }

    isLoaded(value: AudioBuffer | number | null): value is AudioBuffer {
        return !!value && typeof value !== 'number' && isPlatformBrowser(this.platformId);
    }

    private logSong(event: string) {
        this.analytics
            .logEvent(event, {
                id: this.composition.id,
                title: this.title,
            })
            .then()
            .catch();
    }
}
