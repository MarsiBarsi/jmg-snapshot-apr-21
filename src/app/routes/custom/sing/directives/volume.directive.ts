import {Directive, Inject} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {VolumeService} from '../services/volume.service';

@Directive({
    selector: '[volume][waAnalyserNode]',
    providers: [TuiDestroyService, VolumeService],
    outputs: ['volume'],
    exportAs: 'volume',
})
export class VolumeDirective {
    constructor(@Inject(VolumeService) readonly volume: Observable<number>) {}
}
