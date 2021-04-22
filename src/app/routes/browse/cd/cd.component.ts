import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';

@Component({
    selector: 'a[cd]',
    templateUrl: './cd.template.html',
    styleUrls: ['./cd.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._mobile]': 'isMobile',
    },
})
export class CdComponent {
    @Input('cd')
    src = '';

    constructor(@Inject(TUI_IS_MOBILE) readonly isMobile: boolean) {}
}
