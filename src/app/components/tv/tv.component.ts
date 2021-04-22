import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import {LOCATION} from '@ng-web-apis/common';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';
import {getYoutubeId} from 'src/app/utils/get-youtube-id';

@Component({
    selector: 'tv',
    templateUrl: './tv.template.html',
    styleUrls: ['./tv.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._mobile]': 'isMobile',
    },
})
export class TvComponent {
    @Input('youtube')
    set youtubeSetter(youtube: string) {
        this.youtube = getYoutubeId(youtube);
    }

    @Output()
    readonly stateChange = new EventEmitter<YT.OnStateChangeEvent>();

    youtube = '';

    readonly playerVars: YT.PlayerVars = {
        controls: YT.Controls.Hide,
        origin: this.locationRef.origin,
    };

    readonly width = this.isMobile ? 76 : 153;

    readonly height = this.isMobile ? 60 : 119;

    @ViewChild(YouTubePlayer)
    readonly player?: YouTubePlayer;

    constructor(
        @Inject(TUI_IS_MOBILE) readonly isMobile: number,
        @Inject(LOCATION) private readonly locationRef: Location,
    ) {}
}
