import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {mustBePresent} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Song} from 'src/app/interfaces/song';
import {SongDTO} from '../interfaces/songDTO';
import {parseRecord} from '../utils/parse-record';

@Injectable({
    providedIn: 'root',
})
export class SongsService {
    constructor(@Inject(AngularFirestore) private readonly firestore: AngularFirestore) {}

    getSong(id: string): Observable<Song> {
        return this.firestore
            .doc<SongDTO>(`songs/${id}`)
            .get()
            .pipe(
                map(doc => doc.data()),
                mustBePresent(),
                map(({tempo, tracks, backingTrack = '', lyrics = []}) => ({
                    tracks: parseRecord(tracks),
                    tempo,
                    backingTrack,
                    lyrics,
                })),
            );
    }
}
