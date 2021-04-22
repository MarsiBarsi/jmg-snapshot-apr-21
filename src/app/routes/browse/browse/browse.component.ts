import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {tuiPure} from '@taiga-ui/cdk';
import {Observable, of} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Composition} from 'src/app/interfaces/composition';
import {COMPOSITIONS_PROVIDER} from 'src/app/providers/compositions';
import {AudioService} from 'src/app/services/audio.service';
import {CompositionsService} from 'src/app/services/compositions.service';
import {getTrack} from 'src/app/utils/get-track';

const COMPOSITIONS = makeStateKey<readonly Composition[]>('compositions');

@Component({
    selector: 'browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [COMPOSITIONS_PROVIDER],
})
export class BrowseComponent {
    youtube = '';

    readonly playerVars: YT.PlayerVars = {
        controls: YT.Controls.Hide,
    };

    constructor(
        @Inject(CompositionsService)
        private readonly compositionsService: CompositionsService,
        @Inject(AudioService) private readonly audioService: AudioService,
        @Inject(AngularFireAuth) private readonly auth: AngularFireAuth,
        @Inject(Router) private readonly router: Router,
        @Inject(TransferState) private readonly transferState: TransferState,
    ) {}

    // TODO: Switch to resolver when https://github.com/angular/angularfire/issues/2695 is fixed
    @tuiPure
    get compositions$(): Observable<readonly Composition[]> {
        if (this.transferState.hasKey(COMPOSITIONS)) {
            return of(this.transferState.get(COMPOSITIONS, []));
        }

        return this.compositionsService.getAll$().pipe(
            map(compositions =>
                [...compositions].sort((a, b) =>
                    a.author + a.title > b.author + b.title ? 1 : -1,
                ),
            ),
            tap(result => this.transferState.set(COMPOSITIONS, result)),
        );
    }

    onHovered(hovered: boolean, composition: Composition, audio: HTMLAudioElement) {
        if (!hovered) {
            audio.src = '';

            return;
        }

        const src = getTrack(composition);

        audio.src = src;
        setTimeout(() => {
            this.audioService.fetch(src).pipe(takeUntil(this.router.events)).subscribe();
        });
    }

    onYoutube(hovered: boolean, youtube: string) {
        this.youtube = hovered ? youtube : '';
    }

    logout() {
        this.auth.signOut().then(() => {
            this.router.navigateByUrl('');
        });
    }
}
