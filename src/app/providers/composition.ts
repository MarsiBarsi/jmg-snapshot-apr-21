import {ActivatedRoute} from '@angular/router';
import {Composition} from '../interfaces/composition';
import {COMPOSITION} from '../tokens/composition';

export function compositionFactory({snapshot}: ActivatedRoute): Composition {
    return snapshot.data.composition;
}

export const COMPOSITION_PROVIDER = {
    provide: COMPOSITION,
    deps: [ActivatedRoute],
    useFactory: compositionFactory,
};
