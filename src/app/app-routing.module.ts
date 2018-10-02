import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InitialPageComponent} from './initial-page/initial-page.component';
import {LoginComponent} from './initial-page/login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ProfileComponent} from './initial-page/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'initial-page', pathMatch: 'full' },
  { path: 'initial-page', component: InitialPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
