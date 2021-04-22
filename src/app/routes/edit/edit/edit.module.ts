import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {
    TuiButtonModule,
    TuiDropdownModule,
    TuiModeModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {TuiInputCountModule, TuiInputNumberModule} from '@taiga-ui/kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {NoteModule} from 'src/app/components/note/note.module';
import {BackModule} from 'src/app/directives/back/back.module';
import {HandModule} from '../hand/hand.module';
import {EditComponent} from './edit.component';

const ROUTES: Routes = [
    {
        path: '',
        component: EditComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PolymorpheusModule,
        NoteModule,
        HandModule,
        BackModule,
        RouterModule.forChild(ROUTES),
        TuiButtonModule,
        TuiSvgModule,
        TuiInputNumberModule,
        TuiTextfieldControllerModule,
        TuiDropdownModule,
        TuiInputCountModule,
        TuiModeModule,
    ],
    declarations: [EditComponent],
    exports: [EditComponent],
})
export class EditModule {}
