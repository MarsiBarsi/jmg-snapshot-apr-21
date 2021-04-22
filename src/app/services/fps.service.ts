import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {PERFORMANCE} from '@ng-web-apis/common';

@Injectable({
    providedIn: 'root',
})
export class FpsService {
    fps = 0;

    constructor(
        @Inject(PERFORMANCE) private readonly performanceRef: Performance,
        @Inject(PLATFORM_ID) platformId: Object,
    ) {
        if (isPlatformServer(platformId)) {
            return;
        }

        this.performanceRef.mark('frame');
        requestAnimationFrame(this.measure.bind(this));
    }

    private measure() {
        this.performanceRef.measure('fps', 'frame');
        this.performanceRef.mark('frame');

        const entries = this.performanceRef.getEntriesByName('fps');

        if (entries.length > 60) {
            this.performanceRef.clearMeasures('fps');
            this.fps =
                1000 /
                (entries.reduce((sum, cur) => sum + cur.duration, 0) / entries.length);
        }

        requestAnimationFrame(this.measure.bind(this));
    }
}
