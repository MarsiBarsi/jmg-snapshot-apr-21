import {Hand} from 'src/app/enums/hand';
import {Composition} from 'src/app/interfaces/composition';
import {Note} from 'src/app/interfaces/note';
import {Settings} from 'src/app/interfaces/settings';
import {Song} from 'src/app/interfaces/song';
import {CALIBRATED_PROVIDER} from 'src/app/providers/calibrated';
import {CALIBRATION_PROVIDER} from 'src/app/providers/calibration';
import {CHOP_PROVIDER} from 'src/app/providers/chop';
import {DURATION_PROVIDER} from 'src/app/providers/duration';
import {NOTES_RANGE_PROVIDER} from 'src/app/providers/notes-range';
import {PRELOAD_PROVIDER} from 'src/app/providers/preload';
import {SETTINGS_PROVIDER} from 'src/app/providers/settings';
import {COMPOSITION} from 'src/app/tokens/composition';
import {SCORE_FACTORY} from 'src/app/tokens/score-factory';
import {SETTINGS} from 'src/app/tokens/settings';
import {SONG} from 'src/app/tokens/song';
import {TEMPO} from 'src/app/tokens/tempo';
import {TRACK} from 'src/app/tokens/track';
import {playScoreFactory} from 'src/app/utils/play-score-factory';

export const PLAY_PROVIDERS = [
    NOTES_RANGE_PROVIDER,
    CALIBRATION_PROVIDER,
    CALIBRATED_PROVIDER,
    PRELOAD_PROVIDER,
    DURATION_PROVIDER,
    SETTINGS_PROVIDER,
    CHOP_PROVIDER,
    {
        provide: TEMPO,
        deps: [SONG, COMPOSITION, SETTINGS],
        useFactory: tempoFactory,
    },
    {
        provide: TRACK,
        deps: [SONG, SETTINGS],
        useFactory: trackFactory,
    },
    {
        provide: SCORE_FACTORY,
        useValue: playScoreFactory,
    },
];

export function tempoFactory(
    {tempo}: Song,
    {id}: Composition,
    {speed}: Settings,
): number {
    return (tempo * (speed[id] || 100)) / 100;
}

export function trackFactory(
    {tracks}: Song,
    {leftHand, rightHand}: Settings,
): readonly Note[] {
    const track = tracks.get('Music') || tracks.get('Song') || [];

    return track.filter(
        ({hand}) =>
            (hand === Hand.Left && leftHand) || (hand === Hand.Right && rightHand),
    );
}
