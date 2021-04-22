import {Directive, Inject} from '@angular/core';
import {AudioBufferService} from '@ng-web-apis/audio';
import {Observable} from 'rxjs';
import {CALIBRATED} from '../tokens/calibrated';
import {PRELOAD} from '../tokens/preload';

@Directive()
export abstract class AbstractInstrument {
    constructor(
        @Inject(CALIBRATED) readonly notes$: Observable<Map<number, number | null>>,
        @Inject(PRELOAD) preload$: Observable<readonly number[]>,
        @Inject(AudioBufferService)
        audioBufferService: AudioBufferService,
    ) {
        preload$.subscribe(array => {
            array
                .map(key => this.toBuffer(key))
                .filter(v => v)
                .forEach(url => audioBufferService.fetch(url));
        });
    }

    volume(key: number, map: Map<number, number>, destroyed: boolean): number {
        return destroyed ? 0 : map.get(key) || 0;
    }

    abstract toBuffer(key: number): string;
}
