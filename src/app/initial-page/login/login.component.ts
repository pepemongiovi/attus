import {Component, OnInit, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService) { }

  user: User = new User();
  openSignUpDialog = false;

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  signUp() {
    this.openSignUpDialog = true;
    this.close();
  }

  login() {
    this.authService.login(this.user, this.close());
  }
}
