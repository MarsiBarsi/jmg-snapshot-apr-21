import {ActivatedRoute} from '@angular/router';
import {PREVIEW} from '../tokens/preview';

export function previewFactory({snapshot}: ActivatedRoute): boolean {
    return snapshot.data.preview;
}

export const PREVIEW_PROVIDER = {
    provide: PREVIEW,
    deps: [ActivatedRoute],
    useFactory: previewFactory,
};
