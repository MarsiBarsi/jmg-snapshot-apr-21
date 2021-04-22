import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ANIMATION_FRAME, LOCATION} from '@ng-web-apis/common';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ROUTE_ANIMATIONS} from './constants/route-animations';

const TEXT = 'Check out Jamigo.app — a free keys playing and karaoke singing game!';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [ROUTE_ANIMATIONS],
})
export class AppComponent {
    readonly twitter = `https://twitter.com/share?url=${this.locationRef.href}&text=${TEXT}&via=jamigo_app`;

    readonly facebook = `https://www.facebook.com/dialog/feed?&app_id=925185907996831&link=${this.locationRef.href}&display=popup&quote=${TEXT}`;

    readonly vk = `https://vk.com/share.php?url=${this.locationRef.href}&title=Jamigo.app — бесплатная караоке игра`;

    readonly animation$ = this.router.events.pipe(
        filter(
            (event): event is NavigationStart | NavigationEnd =>
                event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        map(({url}) => url.split('/')[1] || ''),
    );

    constructor(
        @Inject(Router) private readonly router: Router,
        @Inject(LOCATION) private readonly locationRef: Location,
        @Inject(ANIMATION_FRAME) animatonFrame$: Observable<number>,
    ) {
        // TODO: Remove when Canvas based effects are implemented
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1080583
        animatonFrame$.subscribe();
    }
}
