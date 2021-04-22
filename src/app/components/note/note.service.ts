import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NoteDirective} from 'src/app/components/note/note.directive';
import {PlayService} from 'src/app/components/note/play.service';
import {POINTER} from 'src/app/tokens/pointer';
import {PREVIEW} from 'src/app/tokens/preview';
import {SCORE} from 'src/app/tokens/score';
import {SCORE_SERVICE} from 'src/app/tokens/score-service';

@Injectable()
export class NoteService {
    note!: NoteDirective;

    constructor(
        @Inject(PREVIEW) preview: boolean,
        @Inject(PlayService) playService: Observable<MIDIMessageEvent>,
        @Inject(SCORE_SERVICE) scoreService: Observable<number>,
        @Inject(SCORE) score$: Subject<number>,
        @Inject(POINTER) pointer: Subject<MIDIMessageEvent>,
    ) {
        if (preview) {
            playService.subscribe(event => {
                event.data[1] += this.note.key;
                this.note.played = !!event.data[2];
                pointer.next(event);
            });
        } else {
            scoreService.subscribe(score => {
                this.note.played = !!score;
                score$.next(score);
            });
        }
    }
}
