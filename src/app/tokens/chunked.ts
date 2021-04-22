import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from 'src/app/interfaces/note';

export const CHUNKED = new InjectionToken<Observable<readonly Note[]>>(
    'Stream of notes, chunked for performance',
);
