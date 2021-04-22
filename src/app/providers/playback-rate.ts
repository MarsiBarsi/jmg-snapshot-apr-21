import {Composition} from 'src/app/interfaces/composition';
import {Settings} from 'src/app/interfaces/settings';
import {COMPOSITION} from 'src/app/tokens/composition';
import {PLAYBACK_RATE} from 'src/app/tokens/playback-rate';
import {SETTINGS} from 'src/app/tokens/settings';
import {VOCAL} from 'src/app/tokens/vocal';

export const PLAYBACK_RATE_PROVIDER = {
    provide: PLAYBACK_RATE,
    deps: [SETTINGS, COMPOSITION, VOCAL],
    useFactory: playbackRateFactory,
};

export function playbackRateFactory(
    {speed}: Settings,
    {id}: Composition,
    vocal: boolean,
): number {
    return vocal ? 1 : (speed[id] || 100) / 100;
}
