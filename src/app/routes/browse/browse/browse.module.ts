import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TuiHoveredModule} from '@taiga-ui/cdk';
import {TuiLoaderModule} from '@taiga-ui/core';
import {TvModule} from 'src/app/components/tv/tv.module';
import {CdModule} from '../cd/cd.module';
import {VhsModule} from '../vhs/vhs.module';
import {BrowseComponent} from './browse.component';

const ROUTES: Routes = [
    {
        path: '',
        component: BrowseComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        TuiHoveredModule,
        TuiLoaderModule,
        CdModule,
        VhsModule,
        TvModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [BrowseComponent],
})
export class BrowseModule {}
