import {Directive, HostBinding, Inject, OnInit} from '@angular/core';
import {NoteService} from 'src/app/components/note/note.service';
import {Finger} from '../../enums/finger';
import {Hand} from '../../enums/hand';
import {NoteComponent} from './note.component';
import {NOTE_PROVIDERS} from './note.providers';

@Directive({
    selector: '[note]',
    providers: NOTE_PROVIDERS
})
export class NoteDirective implements OnInit {
    @HostBinding('attr.data-played')
    played: boolean | null = null;

    constructor(
        @Inject(NoteService) private readonly noteService: NoteService,
        @Inject(NoteComponent) private readonly note: NoteComponent,
    ) {}

    get duration(): number {
        return this.note.height;
    }

    get key(): number {
        return this.note.key;
    }

    get finger(): Finger {
        return this.note.finger;
    }

    get hand(): Hand {
        return this.note.hand;
    }

    ngOnInit() {
        this.noteService.note = this;
    }
}
