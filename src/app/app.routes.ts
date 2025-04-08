import { Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { authGuard } from './auth.guard';
import { GuestVerifyComponent } from './guest-verify/guest-verify.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [authGuard]},
    { path: 'guest-verify/:key', component: GuestVerifyComponent }
];
export default routes;