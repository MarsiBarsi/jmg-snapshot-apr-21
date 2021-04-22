import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-web-apis/common';
import {Settings} from 'src/app/interfaces/settings';

const KEY = 'settings';
export const DEFAULT: Settings = {
    vocalEffect: false,
    effects: true,
    alteredLayout: false,
    fingers: false,
    offset: 20,
    lyricsTop: true,
    leftHand: true,
    rightHand: true,
    speed: {},
    transposition: {},
};

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    settings: Settings = this.localStorage.getItem(KEY)
        ? JSON.parse(this.localStorage.getItem(KEY) || '')
        : DEFAULT;

    constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

    save(settings: Settings) {
        this.localStorage.setItem(KEY, JSON.stringify(settings));
        this.settings = settings;
    }
}
