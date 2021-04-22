import {
    animate,
    group,
    keyframes,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

const BROWSE_TO_CUSTOM = transition('browse => custom', [
    query(
        'browse',
        [
            animate(
                '300ms ease',
                keyframes([
                    style({transform: 'none', opacity: '1', offset: 0}),
                    style({
                        transform: 'translate3d(-100vw, 0, 0)',
                        opacity: '0',
                        offset: 1,
                    }),
                ]),
            ),
        ],
        {optional: true},
    ),
]);

const CUSTOM_TO_BROWSE = transition('custom => browse', [
    query(
        'browse',
        [
            style({
                transform: 'translate3d(-100vw, 0, 0)',
                opacity: '0',
            }),
        ],
        {optional: true},
    ),
    query('custom', [
        style({
            position: 'fixed',
            opacity: '1',
        }),
    ]),
    group([
        query('custom', [
            animate(
                '300ms',
                style({
                    opacity: '0',
                }),
            ),
        ]),
        query(
            'browse',
            [
                animate(
                    '300ms ease-in-out',
                    style({
                        transform: 'none',
                        opacity: 1,
                    }),
                ),
            ],
            {optional: true},
        ),
    ]),
]);

export const ROUTE_ANIMATIONS = trigger('routeAnimations', [
    BROWSE_TO_CUSTOM,
    CUSTOM_TO_BROWSE,
]);
