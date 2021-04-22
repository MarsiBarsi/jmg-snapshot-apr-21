import {Location} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {mustBePresent} from '@taiga-ui/cdk';
import {from, merge, Observable, of, Subject, timer} from 'rxjs';
import {map, mapTo, startWith, switchMap} from 'rxjs/operators';
import {POP} from 'src/app/constants/pop';
import {User} from 'src/app/interfaces/user';

import firebase from 'firebase/app';

export const DEFAULT_ERROR =
    'An error occurred while waiting for response. Please use another social network or try again later!';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [POP],
})
export class LoginComponent {
    private readonly error$ = new Subject<string>();
    readonly errorMessage$: Observable<string> = this.error$.pipe(
        switchMap(message =>
            merge(of(message || DEFAULT_ERROR), timer(10000).pipe(mapTo(''))),
        ),
        startWith(''),
    );

    constructor(
        @Inject(AngularFireAuth)
        private readonly auth: AngularFireAuth,
        @Inject(AngularFirestore)
        private readonly firestore: AngularFirestore,
        @Inject(Location)
        private readonly locationRef: Location,
    ) {}

    loginWithGithub() {
        this.signInWithProvider(new firebase.auth.GithubAuthProvider());
    }

    loginWithGoogle() {
        this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
    }

    loginWithTwitter() {
        this.signInWithProvider(new firebase.auth.TwitterAuthProvider());
    }

    loginWithFacebook() {
        this.signInWithProvider(new firebase.auth.FacebookAuthProvider());
    }

    private signInWithProvider(provider: firebase.auth.AuthProvider) {
        from(this.auth.signInWithPopup(provider))
            .pipe(
                map(({user}) => user),
                mustBePresent(),
                switchMap(({uid, photoURL, displayName}) =>
                    this.firestore
                        .doc(`users/${uid}`)
                        .get()
                        .pipe(
                            map(doc => doc.data()),
                            switchMap(user =>
                                user
                                    ? of(undefined)
                                    : this.firestore
                                          .doc<Omit<User, 'id'>>(`users/${uid}`)
                                          .set({
                                              avatar: photoURL || '',
                                              username: displayName || '',
                                          }),
                            ),
                        ),
                ),
            )
            .subscribe({
                next: () => {
                    this.locationRef.back();
                },
                error: ({message}: Error) => {
                    this.error$.next(message);
                },
            });
    }
}
