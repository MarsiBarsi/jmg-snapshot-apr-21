import {ActivatedRoute} from '@angular/router';
import {Composition} from '../interfaces/composition';
import {COMPOSITIONS} from '../tokens/compositions';

export function compositionsFactory({snapshot}: ActivatedRoute): Composition {
    return snapshot.data.compositions;
}

export const COMPOSITIONS_PROVIDER = {
    provide: COMPOSITIONS,
    deps: [ActivatedRoute],
    useFactory: compositionsFactory,
};
