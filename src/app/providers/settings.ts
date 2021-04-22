import {Settings} from 'src/app/interfaces/settings';
import {SettingsService} from '../services/settings.service';
import {SETTINGS} from '../tokens/settings';

export function settingsFactory({settings}: SettingsService): Settings {
    return settings;
}

export const SETTINGS_PROVIDER = {
    provide: SETTINGS,
    deps: [SettingsService],
    useFactory: settingsFactory,
};
