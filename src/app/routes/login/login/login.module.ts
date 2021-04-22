import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from 'src/app/routes/login/login/login.component';

const ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ROUTES)],
    declarations: [LoginComponent],
    exports: [LoginComponent],
})
export class LoginModule {}
