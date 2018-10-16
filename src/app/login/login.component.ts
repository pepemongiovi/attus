import {Component, OnInit, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {MessageService} from '../services/message.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private messageService: MessageService) { }

  user = new User();
  openSignUpDialog = false;

  ngOnInit() {}

  closeIfLogged() {
    if(JSON.parse(localStorage.getItem('user'))) {
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  signUp() {
    this.openSignUpDialog = true;
    this.close();
  }

  login() {
    this.authService.login(this.user);
  }
}
