import {Directive, ElementRef, Inject, Renderer2} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, takeUntil} from 'rxjs/operators';
import {NOTES_RANGE} from 'src/app/tokens/notes-range';
import {PitchService} from '../services/pitch.service';
import {VolumeService} from '../services/volume.service';

@Directive({
    selector: '[voice]',
    providers: [TuiDestroyService],
})
export class VoiceDirective {
    constructor(
        @Inject(NOTES_RANGE) range: [number, number],
        @Inject(PitchService) pitch$: Observable<number>,
        @Inject(VolumeService) volume$: Observable<number>,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLElement>,
        @Inject(Renderer2) renderer: Renderer2,
        @Inject(TuiDestroyService) destroy$: Observable<void>,
    ) {
        const length = range[1] - range[0];

        pitch$
            .pipe(
                filter(note => note >= range[0] && note <= range[1]),
                map(note => (note - range[0] + 0.5) / length),
                distinctUntilChanged(),
                takeUntil(destroy$),
            )
            .subscribe(fraction => {
                renderer.setStyle(nativeElement, 'bottom', `${100 * fraction}%`);
            });

        volume$
            .pipe(
                map(volume => volume > 0.01),
                distinctUntilChanged(),
                takeUntil(destroy$),
            )
            .subscribe(volume => {
                if (volume) {
                    renderer.addClass(nativeElement, 'visible');
                } else {
                    renderer.removeClass(nativeElement, 'visible');
                }
            });
    }
}
