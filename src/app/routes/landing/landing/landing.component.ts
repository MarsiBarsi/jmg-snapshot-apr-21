import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {NUMB} from 'src/app/constants/numb';
import {NOTES_RANGE} from 'src/app/tokens/notes-range';

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NOTES_RANGE,
            useValue: [47, 71],
        },
    ],
})
export class LandingComponent {
    test = false;

    readonly track = NUMB;

    readonly browser = isPlatformBrowser(this.platformId);

    constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

    onTry() {
        this.test = true;
    }
}
