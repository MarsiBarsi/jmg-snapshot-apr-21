import {animate, style, transition, trigger} from '@angular/animations';

const IN = transition(':enter', [
    style({transform: 'scale(0)'}),
    animate('100ms ease', style({transform: 'scale(1)'})),
]);

const OUT = transition(':leave', [
    style({transform: 'scale(1)'}),
    animate('100ms ease', style({transform: 'scale(0)'})),
]);

export const POP = trigger('pop', [IN, OUT]);

export const POP_IN = trigger('popIn', [IN]);
