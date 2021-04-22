import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {UNIVERSAL_PROVIDERS} from '@ng-web-apis/universal';
import {AppBrowserModule} from './app.browser.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [AppBrowserModule, ServerModule, ServerTransferStateModule],
    bootstrap: [AppComponent],
    providers: [UNIVERSAL_PROVIDERS],
})
export class AppServerModule {}
