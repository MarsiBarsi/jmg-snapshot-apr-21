import {Directive, forwardRef, Inject, Input, SkipSelf} from '@angular/core';
import {
    audioParam,
    AudioParamInput,
    AUDIO_CONTEXT,
    AUDIO_NODE,
    WebAudioWorklet,
} from '@ng-web-apis/audio';

@Directive({
    selector: '[pitchFactor]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => PitchFactorDirective),
        },
    ],
})
export class PitchFactorDirective extends WebAudioWorklet {
    @Input()
    @audioParam()
    pitchFactor?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context, node, 'phase-vocoder-processor');
    }
}
