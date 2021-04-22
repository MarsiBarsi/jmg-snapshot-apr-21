import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {TvComponent} from './tv.component';

@NgModule({
    imports: [CommonModule, YouTubePlayerModule],
    declarations: [TvComponent],
    exports: [TvComponent],
})
export class TvModule {}
