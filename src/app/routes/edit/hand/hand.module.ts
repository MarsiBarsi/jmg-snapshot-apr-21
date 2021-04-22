import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HandComponent} from 'src/app/routes/edit/hand/hand.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HandComponent],
    exports: [HandComponent],
})
export class HandModule {}
