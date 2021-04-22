import {of} from 'rxjs';
import {Note} from 'src/app/interfaces/note';
import {Song} from 'src/app/interfaces/song';
import {CHOP_PROVIDER} from 'src/app/providers/chop';
import {DURATION_PROVIDER} from 'src/app/providers/duration';
import {NOTES_RANGE_PROVIDER} from 'src/app/providers/notes-range';
import {SETTINGS_PROVIDER} from 'src/app/providers/settings';
import {TRANSPOSITION_PROVIDER} from 'src/app/providers/transposition';
import {CALIBRATION} from 'src/app/tokens/calibration';
import {SCORE_FACTORY} from 'src/app/tokens/score-factory';
import {SONG} from 'src/app/tokens/song';
import {TEMPO} from 'src/app/tokens/tempo';
import {TRACK} from 'src/app/tokens/track';
import {VOCAL} from 'src/app/tokens/vocal';
import {singScoreFactory} from 'src/app/utils/sing-score-factory';

export const SING_PROVIDERS = [
    CHOP_PROVIDER,
    NOTES_RANGE_PROVIDER,
    DURATION_PROVIDER,
    SETTINGS_PROVIDER,
    TRANSPOSITION_PROVIDER,
    {
        provide: TEMPO,
        deps: [SONG],
        useFactory: tempoFactory,
    },
    {
        provide: TRACK,
        deps: [SONG],
        useFactory: trackFactory,
    },
    {
        provide: VOCAL,
        useValue: true,
    },
    {
        provide: CALIBRATION,
        useValue: of(0),
    },
    {
        provide: SCORE_FACTORY,
        useValue: singScoreFactory,
    },
];

export function tempoFactory({tempo}: Song): number {
    return tempo;
}

export function trackFactory({tracks}: Song): readonly Note[] {
    return tracks.get('Song') || [];
}
