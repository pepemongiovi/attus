import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    FaqComponent,
    ContactComponent,
    ProjectsComponent,
    AdvantagesComponent,
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
