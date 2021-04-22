import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {LOCATION} from '@ng-web-apis/common';
import {tuiPure} from '@taiga-ui/cdk';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Mode} from 'src/app/enums/mode';
import {Composition} from 'src/app/interfaces/composition';
import {Leaderboard} from 'src/app/interfaces/leaderboard';
import {User} from 'src/app/interfaces/user';
import {LeaderboardService} from 'src/app/services/leaderboard.service';
import {COMPOSITION} from 'src/app/tokens/composition';
import {USER} from 'src/app/tokens/user';
import {scoreSorter} from 'src/app/utils/score-sorter';
import {formatNumber} from '@taiga-ui/core';

export interface ScoreData {
    readonly score: number;
    readonly title: string;
    readonly mode: Mode;
}

interface ScoreContext {
    readonly data: ScoreData;
}

@Component({
    selector: 'score',
    templateUrl: './score.template.html',
    styleUrls: ['./score.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
    readonly score = this.context.data.score;

    readonly twitter = `https://twitter.com/share?url=${this.locationRef.href}&text=${this.text}&via=jamigo_app`;

    readonly facebook = `https://www.facebook.com/dialog/feed?&app_id=925185907996831&link=${this.locationRef.href}&display=popup&quote=${this.text}`;

    readonly vk = `https://vk.com/share.php?url=${this.locationRef.href}&title=${this.score} очков в ${this.context.data.title}`;

    readonly leaderboard$ = this.leaderboardService
        .getLeaders(this.composition.id)
        .pipe(take(1));

    constructor(
        @Inject(LOCATION) private readonly locationRef: Location,
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: ScoreContext,
        @Inject(COMPOSITION) private readonly composition: Composition,
        @Inject(LeaderboardService)
        private readonly leaderboardService: LeaderboardService,
        @Inject(USER) readonly user$: Observable<User | null>,
    ) {}

    @tuiPure
    getBestScore(leaderboard: Leaderboard, {id}: User): number {
        const now = Date.now();
        const leaders = leaderboard[this.context.data.mode];
        const sorted = [...leaders].sort(scoreSorter);
        const best =
            sorted.find(
                ({by, date, score}) =>
                    by === id && (score !== this.score || now - date > 10000),
            ) || 0;

        return best && best.score;
    }

    private get text(): string {
        return `I've earned ${formatNumber(this.score)} points ${
            this.context.data.mode
        } ${this.context.data.title} on`;
    }
}
