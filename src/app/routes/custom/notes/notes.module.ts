import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {WebAudioModule} from '@ng-web-apis/audio';
import {TuiLetModule, TuiMediaModule} from '@taiga-ui/cdk';
import {TuiFormatNumberPipeModule} from '@taiga-ui/core';
import {NoteModule} from 'src/app/components/note/note.module';
import {TvModule} from 'src/app/components/tv/tv.module';
import {IntersectionModule} from 'src/app/directives/intersection/intersection.module';
import {PitchFactorModule} from 'src/app/directives/pitch-factor/pitch-factor.module';
import {NotesComponent} from './notes.component';

@NgModule({
    imports: [
        CommonModule,
        NoteModule,
        IntersectionModule,
        TuiLetModule,
        WebAudioModule,
        TuiFormatNumberPipeModule,
        TuiMediaModule,
        PitchFactorModule,
        TvModule,
    ],
    declarations: [NotesComponent],
    exports: [NotesComponent],
})
export class NotesModule {}
