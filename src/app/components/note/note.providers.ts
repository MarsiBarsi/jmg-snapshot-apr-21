import {
    IntersectionObserverService,
    INTERSECTION_THRESHOLD,
} from '@ng-web-apis/intersection-observer';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {NoteService} from 'src/app/components/note/note.service';
import {PlayService} from 'src/app/components/note/play.service';
import {SCORE_PROVIDER} from 'src/app/providers/score';

export const NOTE_PROVIDERS = [
    PlayService,
    NoteService,
    TuiDestroyService,
    IntersectionObserverService,
    SCORE_PROVIDER,
    {
        provide: INTERSECTION_THRESHOLD,
        useValue: [0, 1],
    },
];
