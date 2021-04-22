import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SupportComponent} from 'src/app/routes/landing/support/support.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SupportComponent],
    exports: [SupportComponent],
})
export class SupportModule {}
