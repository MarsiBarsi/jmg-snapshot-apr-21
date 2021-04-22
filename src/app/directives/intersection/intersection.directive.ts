import {Directive, Inject, Output} from '@angular/core';
import {IntersectionObserverService} from '@ng-web-apis/intersection-observer';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {isIntersecting} from '../../utils/is-intersecting';

@Directive({
    selector: '[intersection]',
    providers: [IntersectionObserverService],
})
export class IntersectionDirective {
    @Output()
    readonly intersection = this.intersection$.pipe(filter(isIntersecting));

    constructor(
        @Inject(IntersectionObserverService)
        private readonly intersection$: Observable<IntersectionObserverEntry[]>,
    ) {}
}
