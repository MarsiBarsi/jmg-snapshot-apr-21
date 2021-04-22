import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CanvasModule} from '@ng-web-apis/canvas';
import {MidiTrackComponent} from 'src/app/routes/upload/midi-track/midi-track.component';
import {TuiSelectModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDataListModule, TuiTextfieldControllerModule} from '@taiga-ui/core';

@NgModule({
    imports: [CommonModule, FormsModule, CanvasModule, TuiSelectModule, TuiDataListModule, TuiTextfieldControllerModule, TuiButtonModule],
    declarations: [MidiTrackComponent],
    exports: [MidiTrackComponent],
})
export class MidiTrackModule {}
