import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Inject,
} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';

@Component({
    selector: 'button[fullscreen]',
    templateUrl: './fullscreen.template.html',
    styleUrls: ['./fullscreen.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent {
    constructor(
        @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean,
        @Inject(WINDOW) private readonly windowRef: Window,
        @Inject(DOCUMENT) private readonly documentRef: Document,
    ) {}

    @HostBinding('class._hidden')
    get hidden(): boolean {
        return this.isFullscreen && this.isLandscape;
    }

    @HostListener('window:orientationchange ')
    @HostListener('document:fullscreenchange')
    noop() {}

    @HostListener('click')
    onClick() {
        this.documentRef.documentElement
            .requestFullscreen()
            .then(
                () =>
                    this.windowRef.screen.orientation &&
                    this.windowRef.screen.orientation.lock('landscape'),
            )
            .catch(() => {});
    }

    private get isFullscreen(): boolean {
        return (
            !this.isMobile ||
            !this.documentRef.fullscreenEnabled ||
            !!this.documentRef.fullscreenElement
        );
    }

    private get isLandscape(): boolean {
        return (
            !this.isMobile ||
            !this.windowRef.screen ||
            !this.windowRef.screen.orientation ||
            this.windowRef.screen.orientation.type.startsWith('landscape')
        );
    }
}
