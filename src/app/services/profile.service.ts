import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {mustBePresent} from '@taiga-ui/cdk';
import {from, Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {User} from 'src/app/interfaces/user';
import {USER} from 'src/app/tokens/user';

function getAvatarUrl(id: string): string {
    return `https://firebasestorage.googleapis.com/v0/b/jamigo-music.appspot.com/o/avatars%2F${id}?alt=media`;
}

@Injectable()
export class ProfileService {
    constructor(
        @Inject(USER) private readonly user$: Observable<User | null>,
        @Inject(AngularFireStorage) private readonly storage: AngularFireStorage,
        @Inject(AngularFirestore) readonly firestore: AngularFirestore,
    ) {}

    updateUsername(username: string): Observable<unknown> {
        return this.user$.pipe(
            mustBePresent(),
            switchMap(({id}) =>
                from(
                    this.firestore.doc(`users/${id}`).set(
                        {
                            username,
                        },
                        {merge: true},
                    ),
                ),
            ),
        );
    }

    updateAvatar(avatar: File | null): Observable<unknown> {
        return this.user$.pipe(
            mustBePresent(),
            take(1),
            switchMap(({id}) =>
                avatar
                    ? from(
                          this.storage
                              .upload(`avatars/${id}`, avatar)
                              .then(() =>
                                  this.firestore
                                      .doc(`users/${id}`)
                                      .set({avatar: getAvatarUrl(id)}, {merge: true}),
                              ),
                      )
                    : this.storage
                          .ref(`avatars/${id}`)
                          .delete()
                          .pipe(
                              switchMap(() =>
                                  this.firestore
                                      .doc(`users/${id}`)
                                      .set({avatar: ''}, {merge: true}),
                              ),
                          ),
            ),
        );
    }
}
