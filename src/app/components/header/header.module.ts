import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule, TuiLetModule, TuiPreventDefaultModule} from '@taiga-ui/cdk';
import {TuiButtonModule, TuiHintControllerModule, TuiScrollbarModule} from '@taiga-ui/core';
import {
    TuiAccordionModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiCheckboxLabeledModule,
    TuiInputFileModule,
    TuiInputModule, TuiInputSliderModule, TuiRadioLabeledModule,
} from '@taiga-ui/kit';
import {HeaderComponent} from './header.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        TuiButtonModule,
        TuiAvatarModule,
        TuiSidebarModule,
        TuiInputModule,
        TuiInputFileModule,
        TuiActiveZoneModule,
        TuiBadgedContentModule,
        TuiLetModule,
        TuiPreventDefaultModule,
        TuiAccordionModule,
        TuiScrollbarModule,
        TuiCheckboxLabeledModule,
        TuiInputSliderModule,
        TuiHintControllerModule,
        TuiRadioLabeledModule,
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class HeaderModule {}
