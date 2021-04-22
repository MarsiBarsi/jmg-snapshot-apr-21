import {ElementRef} from '@angular/core';
import {
    INTERSECTION_ROOT,
    INTERSECTION_ROOT_MARGIN,
} from '@ng-web-apis/intersection-observer';
import {Subject} from 'rxjs';
import {Note} from 'src/app/interfaces/note';
import {Settings} from 'src/app/interfaces/settings';
import {CHUNKED_PROVIDER} from 'src/app/providers/chunked';
import {PLAYBACK_RATE_PROVIDER} from 'src/app/providers/playback-rate';
import {SCORE} from 'src/app/tokens/score';
import {SETTINGS} from 'src/app/tokens/settings';
import {TRACK} from 'src/app/tokens/track';
import {VOCAL} from 'src/app/tokens/vocal';
import {getTrackLength} from 'src/app/utils/get-track-length';

export const NOTES_PROVIDERS = [
    PLAYBACK_RATE_PROVIDER,
    CHUNKED_PROVIDER,
    {
        provide: INTERSECTION_ROOT,
        useExisting: ElementRef,
    },
    {
        provide: SCORE,
        useClass: Subject,
    },
    {
        provide: INTERSECTION_ROOT_MARGIN,
        deps: [SETTINGS, TRACK, VOCAL],
        useFactory: marginFactory,
    },
];

export function marginFactory(
    {offset}: Settings,
    track: readonly Note[],
    vocal: boolean,
): string {
    return vocal
        ? `0px ${getTrackLength(track) + 1000}px 0px -${offset}%`
        : `${getTrackLength(track) + 1000}px 0px -${offset}% 0px`;
}
