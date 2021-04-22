import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ceil, TuiMapper, tuiPure} from '@taiga-ui/cdk';
import {Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Hand} from 'src/app/enums/hand';
import {Composition} from 'src/app/interfaces/composition';
import {Leaderboard} from 'src/app/interfaces/leaderboard';
import {Score} from 'src/app/interfaces/score';
import {Song} from 'src/app/interfaces/song';
import {User} from 'src/app/interfaces/user';
import {trackFactory as playingTrackFactory} from 'src/app/routes/custom/play/play.providers';
import {trackFactory as singingTrackFactory} from 'src/app/routes/custom/sing/sing.providers';
import {LeaderboardService} from 'src/app/services/leaderboard.service';
import {DEFAULT} from 'src/app/services/settings.service';
import {COMPOSITION} from 'src/app/tokens/composition';
import {SONG} from 'src/app/tokens/song';
import {USER} from 'src/app/tokens/user';
import {CHARACTERS, fromId} from 'src/app/utils/from-id';
import {scoreSorter} from 'src/app/utils/score-sorter';
import {SCORE_PER_HIT} from 'src/app/utils/sing-score-factory';

// TODO: Taiga?
function uniqBy<T extends object>(
    array: ReadonlyArray<T>,
    key: keyof T,
): ReadonlyArray<T> {
    return Array.from(
        array
            .reduce((map, item) => {
                if (!map.has(item[key])) {
                    map.set(item[key], item);
                }

                return map;
            }, new Map<T[keyof T], T>())
            .values(),
    );
}


@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.template.html',
    styleUrls: ['./leaderboard.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent {
    readonly toUser: TuiMapper<string, Observable<User>> = id =>
        CHARACTERS.includes(id)
            ? of({id, avatar: '', username: id})
            : this.firestore
                  .doc<User>(`users/${id}`)
                  .get()
                  .pipe(
                      map(doc => doc.data() || {id, avatar: '', username: id}),
                      take(1),
                  );

    readonly leaderboard$ = this.leaderboardService.getLeaders(this.composition.id).pipe(
        map(({singing, playing}) => ({
            singing: uniqBy([...singing, ...this.generateSinging()].sort(scoreSorter), 'by'),
            playing: uniqBy([...playing, ...this.generatePlaying()].sort(scoreSorter), 'by'),
        })),
    );

    constructor(
        @Inject(AngularFirestore) private readonly firestore: AngularFirestore,
        @Inject(LeaderboardService)
        private readonly leaderboardService: LeaderboardService,
        @Inject(COMPOSITION) private readonly composition: Composition,
        @Inject(SONG) private readonly song: Song,
        @Inject(USER) readonly user$: Observable<User | null>,
    ) {}

    @tuiPure
    getBestPlaying({playing}: Leaderboard, id: string): number {
        return playing.find(({by}) => by === id)?.score || 0;
    }

    @tuiPure
    getBestSinging({singing}: Leaderboard, {id}: User): number {
        return singing.find(({by}) => by === id)?.score || 0;
    }

    private generateSinging(): readonly Score[] {
        const total = singingTrackFactory(this.song)
            .filter(({hand}) => hand === Hand.Right)
            .reduce((acc, {duration}) => acc + duration, 0);
        const duration = (1000 * total) / this.song.tempo;
        const max = ceil((SCORE_PER_HIT * duration) / 50, -3);

        return fromId(this.composition.id).map((by, i) => ({
            by,
            song: this.composition.id,
            date: Date.now(),
            score: ceil((1 - i * 0.1) * max, -3),
        }));
    }

    private generatePlaying(): readonly Score[] {
        const reversed = this.composition.id.split('').reverse().join('');
        const max = ceil(
            playingTrackFactory(this.song, DEFAULT).filter(({hand}) => hand === Hand.Left)
                .length * 150,
            -3,
        );

        return fromId(reversed).map((by, i) => ({
            by,
            song: this.composition.id,
            date: Date.now(),
            score: ceil((1 - i * 0.1) * max, -3),
        }));
    }
}
