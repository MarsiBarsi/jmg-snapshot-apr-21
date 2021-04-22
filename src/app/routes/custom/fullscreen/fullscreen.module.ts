import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FullscreenComponent} from 'src/app/routes/custom/fullscreen/fullscreen.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FullscreenComponent],
    exports: [FullscreenComponent],
})
export class FullscreenModule {}
