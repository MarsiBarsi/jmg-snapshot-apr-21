import {NgModule} from '@angular/core';
import {NoteComponent} from './note.component';
import {NoteDirective} from './note.directive';

@NgModule({
    declarations: [NoteComponent, NoteDirective],
    exports: [NoteComponent, NoteDirective],
})
export class NoteModule {}
