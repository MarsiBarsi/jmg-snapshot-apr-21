import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WebAudioModule} from '@ng-web-apis/audio';
import {NotesModule} from 'src/app/routes/custom/notes/notes.module';
import {PitchDirective} from './directives/pitch.directive';
import {VoiceDirective} from './directives/voice.directive';
import {VolumeDirective} from './directives/volume.directive';
import {SingComponent} from './sing.component';

@NgModule({
    imports: [FormsModule, WebAudioModule, CommonModule, NotesModule],
    declarations: [SingComponent, PitchDirective, VolumeDirective, VoiceDirective],
    exports: [SingComponent],
})
export class SingModule {}
