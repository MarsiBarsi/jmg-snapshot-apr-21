import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {InstrumentsModule} from 'src/app/instruments/instruments.module';
import {KeyboardComponent} from './keyboard.component';

@NgModule({
    imports: [CommonModule, InstrumentsModule],
    declarations: [KeyboardComponent],
    exports: [KeyboardComponent],
})
export class KeyboardModule {}
