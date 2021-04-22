import {Inject, Injectable, NgZone} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {Resolve, Router} from '@angular/router';
import {tuiZonefree} from '@taiga-ui/cdk';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, take, tap} from 'rxjs/operators';
import {Composition} from 'src/app/interfaces/composition';
import {CompositionsService} from 'src/app/services/compositions.service';

const COMPOSITIONS = makeStateKey<readonly Composition[]>('compositions');

@Injectable({providedIn: 'root'})
export class BrowseResolver implements Resolve<readonly Composition[]> {
    constructor(
        @Inject(CompositionsService)
        private readonly compositionsService: CompositionsService,
        @Inject(Router) private readonly router: Router,
        @Inject(NgZone) private readonly ngZone: NgZone,
        @Inject(TransferState) private readonly transferState: TransferState,
    ) {}

    resolve(): Observable<readonly Composition[]> {
        if (this.transferState.hasKey(COMPOSITIONS)) {
            return of(this.transferState.get(COMPOSITIONS, []));
        }

        return this.compositionsService.getAll$().pipe(
            tuiZonefree(this.ngZone),
            take(1),
            map(compositions =>
                [...compositions].sort(
                    (a, b) => Number(a.author + a.title) - Number(b.author + b.title),
                ),
            ),
            tap(result => this.transferState.set(COMPOSITIONS, result)),
            catchError(() => this.router.navigate(['']) && EMPTY),
        );
    }
}
