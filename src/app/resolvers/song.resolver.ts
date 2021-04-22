import {Inject, Injectable, NgZone} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SONG_PARAM} from '../constants/query-params';
import {Song} from '../interfaces/song';
import {SongsService} from '../services/songs.service';

@Injectable({providedIn: 'root'})
export class SongResolver implements Resolve<Song> {
    constructor(
        @Inject(SongsService) private readonly songsService: SongsService,
        @Inject(Router) private readonly router: Router,
        @Inject(NgZone) private readonly ngZone: NgZone,
    ) {}

    resolve({params}: ActivatedRouteSnapshot): Observable<Song> {
        return this.ngZone.runOutsideAngular(() =>
            this.songsService
                .getSong(params[SONG_PARAM])
                .pipe(catchError(() => this.router.navigate(['']) && EMPTY)),
        );
    }
}
