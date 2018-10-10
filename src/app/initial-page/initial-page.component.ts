import { Component, OnInit } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {MatDialog} from '@angular/material';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from '../services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import {InstructionsComponent} from './instructions/instructions.component';
import {UserService} from '../services/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private authService: AuthService) { }

  loginDialogRef;
  profileDialogRef;
  signUpDialogRef;
  instructionsDialogRef;

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  invest() {
    if(this.user) this.openInstructionsDialog();
    else this.openSignUpDialog();
  }

  openLoginDialog() {
    if(!this.loginDialogRef) {
      this.loginDialogRef = this.dialog.open(LoginComponent, {
        width: '100vh',
        height: '70vh'
      });

      this.loginDialogRef.afterClosed().subscribe(() => {
        if(this.loginDialogRef.componentInstance.openSignUpDialog) {
          this.openSignUpDialog();
        }
        this.loginDialogRef = undefined;
      });
    }
  }

  openSignUpDialog() {
    if(!this.signUpDialogRef) {
      this.signUpDialogRef = this.dialog.open(SignUpComponent, {
        height: '95%',
        width: '110%'
      });
      this.signUpDialogRef.afterClosed().subscribe(() => {
        this.signUpDialogRef = undefined;
      });
    }
  }

  openInstructionsDialog() {
    if(!this.instructionsDialogRef) {
      this.instructionsDialogRef = this.dialog.open(InstructionsComponent, {
        height: '95%',
        width: '110%'
      });
      this.instructionsDialogRef.afterClosed().subscribe(() => {
        this.instructionsDialogRef = undefined;
      });
    }
  }

  openProfileDialog() {
    if(!this.profileDialogRef) {
      this.profileDialogRef = this.dialog.open(ProfileComponent, {
        height: '95%',
        width: '110%'
      });
      this.profileDialogRef.afterClosed().subscribe(() => {
        this.profileDialogRef = undefined;
      });
    }
  }
}
