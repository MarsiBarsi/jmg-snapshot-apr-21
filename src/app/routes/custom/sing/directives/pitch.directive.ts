import {Directive, Inject} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {PitchService} from '../services/pitch.service';

@Directive({
    selector: '[pitch][waAnalyserNode]',
    providers: [TuiDestroyService, PitchService],
    outputs: ['pitch'],
    exportAs: 'pitch',
})
export class PitchDirective {
    constructor(@Inject(PitchService) readonly pitch: Observable<number>) {}
}
