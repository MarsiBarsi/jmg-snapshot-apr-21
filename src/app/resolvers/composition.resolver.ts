import {Inject, Injectable, NgZone} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SONG_PARAM} from '../constants/query-params';
import {Composition} from '../interfaces/composition';
import {CompositionsService} from '../services/compositions.service';

@Injectable({providedIn: 'root'})
export class CompositionResolver implements Resolve<Composition> {
    constructor(
        @Inject(CompositionsService)
        private readonly compositionsService: CompositionsService,
        @Inject(Router) private readonly router: Router,
        @Inject(NgZone) private readonly ngZone: NgZone,
    ) {}

    resolve({params}: ActivatedRouteSnapshot): Observable<Composition> {
        return this.ngZone.runOutsideAngular(() =>
            this.compositionsService
                .getComposition(params[SONG_PARAM])
                .pipe(catchError(() => this.router.navigate(['']) && EMPTY)),
        );
    }
}
