import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './initial-page/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FaqComponent } from './initial-page/faq/faq.component';
import { ContactComponent } from './initial-page/contact/contact.component';
import { ProjectsComponent } from './initial-page/projects/projects.component';
import { AdvantagesComponent } from './initial-page/advantages/advantages.component';
import { HowItWorksComponent } from './initial-page/how-it-works/how-it-works.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatDialogModule,
  MatDatepickerModule, MatNativeDateModule, MatStepperModule, MAT_DATE_LOCALE, MatTableModule
} from '@angular/material';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import { InitialPageComponent } from './initial-page/initial-page.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { ProfileComponent } from './initial-page/profile/profile.component';
import { InstructionsComponent } from './initial-page/instructions/instructions.component';
import { PersonalInfoComponent } from './initial-page/profile/personal-info/personal-info.component';
import { BankInfoComponent } from './initial-page/profile/bank-info/bank-info.component';
import { InvestmentInfoComponent } from './initial-page/instructions/investment-info/investment-info.component';
import { SliderComponent } from './initial-page/projects/slider/slider.component';
import { InvestmentsInfoComponent } from './initial-page/profile/investments-info/investments-info.component';
import {ProjectService} from './services/project.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyChaLKvUCu6lsakLE04NrEtl1gfKdHXCGc',
  authDomain: 'attus-4fdcb.firebaseapp.com',
  databaseURL: 'https://attus-4fdcb.firebaseio.com',
  projectId: 'attus-4fdcb',
  storageBucket: 'attus-4fdcb.appspot.com',
  messagingSenderId: '68863119549'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    FaqComponent,
    ContactComponent,
    ProjectsComponent,
    AdvantagesComponent,
    HowItWorksComponent,
    SignUpComponent,
    InitialPageComponent,
    InstructionsComponent,
    PersonalInfoComponent,
    BankInfoComponent,
    InvestmentInfoComponent,
    SliderComponent,
    InvestmentsInfoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDatepickerModule,
    MatTableModule
  ],
  providers: [UserService, AuthService, ProjectService, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent],
  entryComponents: [InstructionsComponent]
})
export class AppModule { }
