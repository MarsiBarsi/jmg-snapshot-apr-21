import {Inject, Injectable} from '@angular/core';
import {AUDIO_CONTEXT, WebAudioAnalyser} from '@ng-web-apis/audio';
import {toNote} from '@ng-web-apis/midi';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {filter, map, share, switchMap, takeUntil} from 'rxjs/operators';
import {PitchDetector} from 'src/app/interfaces/pitch-detector';
import {AUBIO} from 'src/app/tokens/aubio';
import {TRANSPOSITION} from 'src/app/tokens/transposition';

@Injectable()
export class PitchService extends Observable<number> {
    constructor(
        @Inject(TRANSPOSITION) transposition: number,
        @Inject(AUDIO_CONTEXT) {sampleRate}: BaseAudioContext,
        @Inject(AUBIO) aubio: Observable<any>,
        @Inject(WebAudioAnalyser) {fftSize, timeFloat$}: WebAudioAnalyser,
        @Inject(TuiDestroyService) destroy$: Observable<void>,
    ) {
        const pitch$ = aubio.pipe(
            map<any, PitchDetector>(
                aubio => new aubio.Pitch('default', fftSize, 1, sampleRate),
            ),
            switchMap(pitch =>
                timeFloat$.pipe(map(array => Math.round(pitch.do(array)))),
            ),
            filter(frequency => frequency > 100 && frequency < 2000),
            map(frequency => toNote(frequency) - transposition),
            takeUntil(destroy$),
            share(),
        );

        super(subscriber => pitch$.subscribe(subscriber));
    }
}
