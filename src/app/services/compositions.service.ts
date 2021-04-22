import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {mustBePresent} from '@taiga-ui/cdk';
import {from, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Song} from 'src/app/interfaces/song';
import {Composition} from '../interfaces/composition';
import {objectifyMap} from '../utils/objectify-map';

@Injectable({
    providedIn: 'root',
})
export class CompositionsService {
    constructor(@Inject(AngularFirestore) private readonly firestore: AngularFirestore) {}

    getComposition(id: string): Observable<Composition> {
        return this.firestore
            .doc<Omit<Composition, 'id'>>(`compositions/${id}`)
            .get()
            .pipe(
                map(doc => doc.data()),
                mustBePresent(),
                map(composition => ({...composition, id})),
            );
    }

    getAll$(): Observable<readonly Composition[]> {
        return this.firestore
            .collection<Composition>('compositions')
            .valueChanges({idField: 'id'})
            .pipe(
                map(compositions =>
                    compositions.filter(({publicAccess}) => publicAccess),
                ),
            );
    }

    add(
        uploadedBy: string,
        composition: Omit<Composition, 'id'>,
        song: Song,
    ): Observable<string> {
        return from(
            this.firestore.collection('compositions').add({
                ...composition,
                uploadedBy,
                publicAccess: false,
            }),
        ).pipe(switchMap(({id}) => this.save(id, song)));
    }

    save(id: string, {tempo, tracks, lyrics}: Song): Observable<string> {
        return from(
            this.firestore
                .doc(`songs/${id}`)
                .set({
                    tracks: objectifyMap(tracks),
                    tempo,
                    lyrics,
                })
                .then(() => id),
        );
    }
}
