import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';

@Component({
    selector: 'a[vhs]',
    templateUrl: './vhs.template.html',
    styleUrls: ['./vhs.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._mobile]': 'isMobile',
    },
})
export class VhsComponent {
    @Input('vhs')
    src = '';

    constructor(@Inject(TUI_IS_MOBILE) readonly isMobile: boolean) {}
}
