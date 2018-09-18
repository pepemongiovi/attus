import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password-validation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^[\w\W]{1,}@[\w\W]{2,}$/;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required, Validators.min(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  resetForm() {
    this.form.reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  onSubmit() {
    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.authService.signUp(user);

    this.resetForm();
  }

}
