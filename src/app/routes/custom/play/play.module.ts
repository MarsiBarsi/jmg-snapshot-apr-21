import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiLetModule} from '@taiga-ui/cdk';
import {KeyboardModule} from '../keyboard/keyboard.module';
import {NotesModule} from '../notes/notes.module';
import {PlayComponent} from './play.component';

@NgModule({
    imports: [TuiLetModule, KeyboardModule, NotesModule, CommonModule],
    declarations: [PlayComponent],
    exports: [PlayComponent],
})
export class PlayModule {}
