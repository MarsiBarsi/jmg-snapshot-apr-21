import {inject} from '@angular/core';
import {InjectionToken} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {User} from '../interfaces/user';

export const USER = new InjectionToken<Observable<User | null>>('User data object', {
    factory: () => {
        const firestore = inject(AngularFirestore);

        return inject(AngularFireAuth).user.pipe(
            map(user => user && user.uid),
            switchMap(id =>
                id
                    ? firestore.doc<User>(`users/${id}`).valueChanges({idField: 'id'})
                    : of(null),
            ),
            map(user =>
                user
                    ? {
                          ...user,
                          avatar:
                              user.avatar && `${user.avatar}&nocache=${Math.random()}`,
                      }
                    : null,
            ),
            shareReplay({bufferSize: 1, refCount: true}),
        );
    },
});
