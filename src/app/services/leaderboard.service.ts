import {Inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {tuiPure} from '@taiga-ui/cdk';
import {Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Mode} from 'src/app/enums/mode';
import {Leaderboard} from 'src/app/interfaces/leaderboard';
import {User} from 'src/app/interfaces/user';
import {USER} from 'src/app/tokens/user';

@Injectable({
    providedIn: 'root',
})
export class LeaderboardService {
    constructor(
        @Inject(AngularFirestore) private readonly firestore: AngularFirestore,
        @Inject(USER) private readonly user$: Observable<User | null>,
    ) {}

    @tuiPure
    getLeaders(song: string): Observable<Leaderboard> {
        return this.firestore
            .doc<Leaderboard>(`score/${song}`)
            .valueChanges()
            .pipe(map(doc => doc || {[Mode.Playing]: [], [Mode.Singing]: []}));
    }

    saveScore(song: string, score: number, mode: Mode): Observable<unknown> {
        const doc$ = this.firestore.doc<Leaderboard>(`score/${song}`).get();
        const score$ = this.user$.pipe(
            take(1),
            map(user =>
                user
                    ? {
                          score,
                          song,
                          by: user.id,
                          date: Date.now(),
                      }
                    : null,
            ),
        );

        return score$.pipe(
            switchMap(score =>
                score
                    ? doc$.pipe(
                          switchMap(doc => {
                              const data: Leaderboard = doc.data() || {
                                  singing: [],
                                  playing: [],
                              };

                              data[mode] = data[mode].concat(score);

                              return doc.ref.set(data);
                          }),
                      )
                    : of(null),
            ),
        );
    }
}
