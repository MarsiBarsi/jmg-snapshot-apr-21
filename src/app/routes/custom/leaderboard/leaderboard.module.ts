import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiLetModule, TuiMapperPipeModule, TuiRepeatTimesModule} from '@taiga-ui/cdk';
import {TuiFormatNumberPipeModule} from '@taiga-ui/core';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {LeaderboardComponent} from './leaderboard.component';

@NgModule({
    imports: [CommonModule, TuiRepeatTimesModule, TuiMapperPipeModule, TuiLetModule, TuiFormatNumberPipeModule, TuiAvatarModule],
    declarations: [LeaderboardComponent],
    exports: [LeaderboardComponent],
})
export class LeaderboardModule {}
