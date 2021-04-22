import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Resolve} from '@angular/router';
import {NAVIGATOR} from '@ng-web-apis/common';
import {from, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MediaStreamResolver implements Resolve<MediaStream | null> {
    constructor(
        @Inject(NAVIGATOR) private readonly navigator: Navigator,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
    ) {}

    resolve(): Observable<MediaStream | null> {
        return isPlatformServer(this.platformId)
            ? of(null)
            : from(
                  this.navigator.mediaDevices
                      .getUserMedia({
                          audio: {
                              latency: 0.005,
                          },
                      })
                      .catch(() => null),
              );
    }
}
