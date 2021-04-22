import {InjectionToken} from '@angular/core';
import {Note} from 'src/app/interfaces/note';

export const TRACK = new InjectionToken<readonly Note[]>('Notes of the track');
