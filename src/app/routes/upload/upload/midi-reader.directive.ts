import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {NgControl} from '@angular/forms';
import {isPresent} from '@taiga-ui/cdk';
import {parseArrayBuffer} from 'midi-json-parser';
import {IMidiFile} from 'midi-json-parser-worker';
import {from, fromEvent, Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {fileToArrayBuffer} from 'src/app/utils/file-to-array-buffer';

@Directive({
    selector: 'tui-input-file[midi]',
})
export class MidiReaderDirective {
    @Output()
    readonly midi: Observable<IMidiFile | Error>;

    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLElement>,
        @Inject(NgControl) control: NgControl,
    ) {
        this.midi = fromEvent(nativeElement, 'change').pipe(
            map(() => control.value),
            filter(isPresent),
            switchMap(file => fileToArrayBuffer(file)),
            switchMap(arrayBuffer =>
                from(parseArrayBuffer(arrayBuffer)).pipe(
                    catchError(() => of(new Error('Failed to parse file'))),
                ),
            ),
        );
    }
}
