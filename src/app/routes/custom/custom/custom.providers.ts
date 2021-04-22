import {isPlatformServer} from '@angular/common';
import {InjectionToken, NgZone, PLATFORM_ID} from '@angular/core';
import {TuiDestroyService, tuiZonefull} from '@taiga-ui/cdk';
import {defer, EMPTY, Observable, of} from 'rxjs';
import {Composition} from 'src/app/interfaces/composition';
import {COMPOSITION_PROVIDER} from 'src/app/providers/composition';
import {MEDIA_STREAM_PROVIDER} from 'src/app/providers/media-stream';
import {PREVIEW_PROVIDER} from 'src/app/providers/preview';
import {SONG_PROVIDER} from 'src/app/providers/song';
import {AudioService} from 'src/app/services/audio.service';
import {COMPOSITION} from 'src/app/tokens/composition';
import {getTrack} from 'src/app/utils/get-track';

export const AUDIO = new InjectionToken<Observable<number | AudioBuffer>>(
    'Audio preloading stream',
);
export const CUSTOM_PROVIDERS = [
    TuiDestroyService,
    MEDIA_STREAM_PROVIDER,
    COMPOSITION_PROVIDER,
    SONG_PROVIDER,
    PREVIEW_PROVIDER,
    {
        provide: AUDIO,
        deps: [AudioService, COMPOSITION, NgZone, PLATFORM_ID],
        useFactory: audioFactory,
    },
];

export function audioFactory(
    service: AudioService,
    composition: Composition,
    ngZone: NgZone,
    platformId: object,
): Observable<unknown> {
    if (composition.youtube) {
        return of(true);
    }

    return isPlatformServer(platformId)
        ? EMPTY
        : defer(() => service.fetch(getTrack(composition))).pipe(tuiZonefull(ngZone));
}
