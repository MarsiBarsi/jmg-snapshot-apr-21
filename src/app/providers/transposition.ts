import {Composition} from 'src/app/interfaces/composition';
import {Settings} from 'src/app/interfaces/settings';
import {COMPOSITION} from 'src/app/tokens/composition';
import {SETTINGS} from 'src/app/tokens/settings';
import {TRANSPOSITION} from 'src/app/tokens/transposition';

export const TRANSPOSITION_PROVIDER = {
    provide: TRANSPOSITION,
    deps: [SETTINGS, COMPOSITION],
    useFactory: transpositionFactory,
};

export function transpositionFactory(
    {transposition}: Settings,
    {id}: Composition,
): number {
    return transposition[id] || 0;
}
