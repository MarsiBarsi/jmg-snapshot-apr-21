import {InjectionToken} from '@angular/core';
import {Song} from 'src/app/interfaces/song';

export const SONG = new InjectionToken<Song>('A song to play');
