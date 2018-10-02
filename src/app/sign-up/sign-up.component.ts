import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password-validation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ProfileComponent} from '../initial-page/profile/profile.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpComponent>) {}

  emailRegex = /^[\w\W]{1,}@[\w\W]{2,}$/;
  user = new User();
  pageTitle = 'Dados pessoais';
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];

  ngOnInit() {
  }

  next() {
    this.pageTitle = 'Dados bancários (OPCIONAL)';
  }

  back() {
    this.pageTitle = 'Dados pessoais';
  }

  close() {
    this.dialogRef.close();
  }

  signUp() {

  }

}
