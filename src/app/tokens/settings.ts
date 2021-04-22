import {InjectionToken} from '@angular/core';
import {Settings} from 'src/app/interfaces/settings';

export const SETTINGS = new InjectionToken<Settings>('Current settings');
