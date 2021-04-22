import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TuiButtonModule} from '@taiga-ui/core';
import {NoteModule} from 'src/app/components/note/note.module';
import {SupportModule} from '../support/support.module';
import {LandingComponent} from './landing.component';

const ROUTES: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        TuiButtonModule,
        NoteModule,
        SupportModule,
    ],
    declarations: [LandingComponent],
    exports: [LandingComponent],
})
export class LandingModule {}
