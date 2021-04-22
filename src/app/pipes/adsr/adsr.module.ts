import {NgModule} from '@angular/core';
import {AdsrPipe} from './adsr.pipe';

@NgModule({
    declarations: [AdsrPipe],
    exports: [AdsrPipe],
})
export class AdsrModule {}
