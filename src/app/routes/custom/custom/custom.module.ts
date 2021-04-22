import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TuiLetModule} from '@taiga-ui/cdk';
import {TuiButtonModule, TuiLoaderModule} from '@taiga-ui/core';
import {SONG_PARAM} from 'src/app/constants/query-params';
import {CompositionResolver} from 'src/app/resolvers/composition.resolver';
import {SongResolver} from 'src/app/resolvers/song.resolver';
import {FullscreenModule} from '../fullscreen/fullscreen.module';
import {LeaderboardModule} from '../leaderboard/leaderboard.module';
import {PlayModule} from '../play/play.module';
import {ScoreModule} from '../score/score.module';
import {SingModule} from '../sing/sing.module';
import {CustomComponent} from './custom.component';

const ROUTES: Routes = [
    {
        path: `:${SONG_PARAM}`,
        component: CustomComponent,
        resolve: {
            song: SongResolver,
            composition: CompositionResolver,
        },
    },
    {
        path: `:${SONG_PARAM}/preview`,
        component: CustomComponent,
        resolve: {
            song: SongResolver,
            composition: CompositionResolver,
        },
        data: {
            preview: true,
        },
    },
];

@NgModule({
    imports: [
        CommonModule,
        TuiLetModule,
        SingModule,
        PlayModule,
        ScoreModule,
        FullscreenModule,
        TuiLoaderModule,
        TuiButtonModule,
        LeaderboardModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [CustomComponent],
    exports: [CustomComponent],
})
export class CustomModule {}
