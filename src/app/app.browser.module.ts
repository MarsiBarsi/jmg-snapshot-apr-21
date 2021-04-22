import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AUDIO_WORKLET_PROCESSORS} from '@ng-web-apis/audio';
import {
    iconsPathFactory,
    TuiButtonModule,
    TuiDialogModule,
    TuiModeModule,
    TuiRootModule,
    TUI_ICONS_PATH,
    TUI_DIALOGS_CLOSE,
} from '@taiga-ui/core';
import 'firebase/firestore';
import {Observable} from 'rxjs';
import {HeaderModule} from 'src/app/components/header/header.module';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        ServiceWorkerModule.register('safety-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerImmediately',
        }),
        BrowserModule.withServerTransition({appId: 'jamigo'}),
        BrowserTransferStateModule,
        HeaderModule,
        AppRoutingModule,
        TuiRootModule,
        TuiDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAnalyticsModule,
        BrowserAnimationsModule,
        TuiModeModule,
        TuiButtonModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: TUI_DIALOGS_CLOSE,
            deps: [Router],
            useFactory: dialogCloseFactory,
        },
        {
            provide: TUI_ICONS_PATH,
            useValue: iconsPathFactory('assets/taiga-ui/icons/'),
        },
        {
            provide: AUDIO_WORKLET_PROCESSORS,
            useValue: 'assets/phase-vocoder-processor.min.js',
            multi: true,
        },
    ],
})
export class AppBrowserModule {}

export function dialogCloseFactory({events}: Router): Observable<unknown> {
    return events;
}
