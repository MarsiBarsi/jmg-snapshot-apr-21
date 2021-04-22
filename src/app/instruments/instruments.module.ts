import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {WebAudioModule} from '@ng-web-apis/audio';
import {FrequencyPipeModule} from '@ng-web-apis/midi';
import {ForMapOfModule} from '../directives/for-map/for-map.module';
import {AdsrModule} from '../pipes/adsr/adsr.module';
import {PianoComponent} from './piano/piano.component';
import {RetrowaveComponent} from './retrowave/retrowave.component';

@NgModule({
    imports: [
        CommonModule,
        WebAudioModule,
        ForMapOfModule,
        AdsrModule,
        FrequencyPipeModule,
    ],
    declarations: [RetrowaveComponent, PianoComponent],
    exports: [RetrowaveComponent, PianoComponent],
})
export class InstrumentsModule {}
