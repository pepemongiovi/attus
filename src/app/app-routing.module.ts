import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InitialPageComponent} from './initial-page/initial-page.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {FaqComponent} from './initial-page/faq/faq.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
