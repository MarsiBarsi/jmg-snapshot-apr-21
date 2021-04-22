import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppBrowserModule} from './app/app.browser.module';
import {environment} from './environments/environment';

bootstrap();

function bootstrap() {
    if (!window.IntersectionObserver) {
        document.querySelector('.g-browser')!.classList.add('g-browser-visible');

        return;
    }

    if (environment.production) {
        enableProdMode();
    }

    document.addEventListener('DOMContentLoaded', () => {
        platformBrowserDynamic().bootstrapModule(AppBrowserModule).catch(console.error);
    });
}
