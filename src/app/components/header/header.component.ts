import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AUDIO_WORKLET_SUPPORT} from '@ng-web-apis/audio';
import {tuiPure} from '@taiga-ui/cdk';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Composition} from 'src/app/interfaces/composition';
import {User} from 'src/app/interfaces/user';
import {ProfileService} from 'src/app/services/profile.service';
import {SettingsService} from 'src/app/services/settings.service';
import {USER} from 'src/app/tokens/user';
import {getNestedData} from 'src/app/utils/get-nested-data';

@Component({
    selector: 'header',
    templateUrl: './header.template.html',
    styleUrls: ['./header.style.less'],
    providers: [ProfileService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    open = false;

    readonly file$ = new Subject<File | null>();

    readonly percents = ['%', '%', '%'];

    readonly semitones = ['semitone', 'semitones', 'semitones'];

    readonly composition$: Observable<Composition | null> = this.router.events.pipe(
        startWith(null),
        map(() => getNestedData(this.router).composition || null),
        distinctUntilChanged(),
    );

    constructor(
        @Inject(USER) readonly user$: Observable<User>,
        @Inject(AngularFireAuth) private readonly auth: AngularFireAuth,
        @Inject(ProfileService) private readonly profileService: ProfileService,
        @Inject(SettingsService) private readonly settingsService: SettingsService,
        @Inject(Router) private readonly router: Router,
        @Inject(AUDIO_WORKLET_SUPPORT) private readonly workletSupport: boolean,
    ) {}

    get leftHand(): boolean {
        return this.settingsService.settings.leftHand;
    }

    get rightHand(): boolean {
        return this.settingsService.settings.rightHand;
    }

    get vocalEffect(): boolean {
        return this.settingsService.settings.vocalEffect;
    }

    get lyricsTop(): boolean {
        return this.settingsService.settings.lyricsTop;
    }

    getSpeed(composition: Composition | null): number {
        return composition
            ? this.settingsService.settings.speed[composition.id] || 100
            : 100;
    }

    getTransposition(composition: Composition | null): number {
        return composition
            ? this.settingsService.settings.transposition[composition.id] || 0
            : 0;
    }

    getTranspositionQuantum(composition: Composition | null): number {
        return !this.workletSupport || (composition && composition.youtube) ? 12 : 1;
    }

    getHint(composition: unknown): string {
        return composition
            ? 'Applies to the current song'
            : 'Open a song to enable this option';
    }

    onLeftHandChange(leftHand: boolean) {
        this.settingsService.save({...this.settingsService.settings, leftHand});
    }

    onRightHandChange(rightHand: boolean) {
        this.settingsService.save({...this.settingsService.settings, rightHand});
    }

    onSpeedChange(speed: number, composition: Composition | null) {
        if (!composition) {
            return;
        }

        this.settingsService.save({
            ...this.settingsService.settings,
            speed: {...this.settingsService.settings.speed, [composition.id]: speed},
        });
    }

    onVocalEffectChange(vocalEffect: boolean) {
        this.settingsService.save({...this.settingsService.settings, vocalEffect});
    }

    onLyricsTopChange(lyricsTop: boolean) {
        this.settingsService.save({...this.settingsService.settings, lyricsTop});
    }

    onTranspositionChange(transposition: number, composition: Composition | null) {
        if (!composition) {
            return;
        }

        this.settingsService.save({
            ...this.settingsService.settings,
            transposition: {
                ...this.settingsService.settings.transposition,
                [composition.id]: transposition,
            },
        });
    }

    toggle(open: boolean) {
        this.open = open;
    }

    logout() {
        this.auth.signOut();
        this.toggle(false);
    }

    @tuiPure
    getLoading(file: File | null): readonly File[] {
        return file ? [file] : [];
    }

    onActiveZone(active: boolean) {
        if (!active) {
            this.toggle(false);
        }
    }

    onNameChange(name: string) {
        this.profileService.updateUsername(name).subscribe();
    }

    onAvatarChange(avatar: File | null) {
        this.file$.next(avatar);
        this.profileService.updateAvatar(avatar).subscribe(() => {
            this.file$.next(null);
        });
    }
}
