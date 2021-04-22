import {NgModule} from '@angular/core';
import {PitchFactorDirective} from './pitch-factor.directive';

@NgModule({
    declarations: [PitchFactorDirective],
    exports: [PitchFactorDirective],
})
export class PitchFactorModule {}
