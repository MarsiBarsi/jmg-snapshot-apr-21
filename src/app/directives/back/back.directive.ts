import {Location} from '@angular/common';
import {Directive, HostListener, Inject} from '@angular/core';

@Directive({
    selector: 'button[back]',
    host: {
        type: 'button',
    },
})
export class BackDirective {
    constructor(@Inject(Location) private readonly locationRef: Location) {}

    @HostListener('click')
    onClick() {
        this.locationRef.back();
    }
}
