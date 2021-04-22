import {ActivatedRoute} from '@angular/router';
import {MEDIA_STREAM} from '@ng-web-apis/audio';

export function mediaStreamFactory({snapshot}: ActivatedRoute): MediaStream | null {
    return snapshot.data.mediaStream;
}

export const MEDIA_STREAM_PROVIDER = {
    provide: MEDIA_STREAM,
    deps: [ActivatedRoute],
    useFactory: mediaStreamFactory,
};
