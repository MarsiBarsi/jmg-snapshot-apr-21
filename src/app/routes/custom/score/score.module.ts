import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiButtonModule, TuiFormatNumberPipeModule, TuiLoaderModule} from '@taiga-ui/core';
import {ScoreComponent} from './score.component';

@NgModule({
    imports: [RouterModule, TuiButtonModule, CommonModule, TuiFormatNumberPipeModule, TuiLoaderModule],
    declarations: [ScoreComponent],
    exports: [ScoreComponent],
})
export class ScoreModule {}
