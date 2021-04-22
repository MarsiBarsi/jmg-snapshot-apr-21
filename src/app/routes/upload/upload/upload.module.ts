import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiCheckboxModule, TuiInputFileModule, TuiInputModule} from '@taiga-ui/kit';
import {MidiTrackModule} from '../midi-track/midi-track.module';
import {MidiReaderDirective} from './midi-reader.directive';
import {UploadComponent} from './upload.component';

const ROUTES: Routes = [
    {
        path: '**',
        component: UploadComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        MidiTrackModule,
        AngularFireStorageModule,
        TuiInputModule,
        TuiInputFileModule,
        TuiButtonModule,
        TuiCheckboxModule,
    ],
    declarations: [UploadComponent, MidiReaderDirective],
})
export class UploadModule {}
