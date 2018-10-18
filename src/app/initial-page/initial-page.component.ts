import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileComponent} from '../profile/profile.component';
import {AuthService} from '../services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import {InstructionsComponent} from '../instructions/instructions.component';
import {UserService} from '../services/user.service';
import * as firebase from 'firebase';
import {ProjectService} from '../services/project.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private projectService: ProjectService) { }

  loginDialogRef;
  profileDialogRef;
  signUpDialogRef;
  instructionsDialogRef;
  dashboardDialogRef;

  ngOnInit() {
    this.projectService.fetchProjects();
  }

  noDialogsOpened() {
    return !this.loginDialogRef && !this.profileDialogRef &&
      !this.signUpDialogRef && !this.instructionsDialogRef &&
      !this.dashboardDialogRef;
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user')).user;
    return user.uid === '13bnR2dXlMVBARsjrpIGNki1Y9V2';
  }

  invest() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) this.openInstructionsDialog();
    else this.openLoginDialog();
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

  openDashboardDialog() {
    if(!this.dashboardDialogRef) {
      this.dashboardDialogRef = this.dialog.open(DashboardComponent, {
        height: '95%',
        width: '110%'
      });
      this.dashboardDialogRef.afterClosed().subscribe(() => {
        this.dashboardDialogRef = undefined;
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
