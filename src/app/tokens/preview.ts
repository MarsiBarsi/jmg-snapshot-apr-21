import {InjectionToken} from '@angular/core';

export const PREVIEW = new InjectionToken<boolean>('Preview mode', {
    factory: () => false,
});
