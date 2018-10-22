import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../shared/password-validation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ProfileComponent} from '../profile/profile.component';
import {MatDialogRef} from '@angular/material';
import {PersonalInfo} from '../models/personalInfo.model';
import {User} from '../models/user.model';
import {BankInfo} from '../models/bankInfo.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  pageTitle = 'Dados pessoais';
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];
  countries = require('../../jsons/countries.json');
  bankInfo: BankInfo = new BankInfo();
  personalInfo = new PersonalInfo();
  user = new User();
  submitBtnDisabled = true;
  form: FormGroup;
  passwordRegex = /^(?=.*\d).{8,}$/;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required]],
      issuingBody: ['', Validators.required],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDay: ['', Validators.required],
      ddi: ['55', Validators.required],
      phone: ['', Validators.required],
      profession: ['', Validators.required],
      civilStatus: ['', Validators.required],
      country: [this.countries[29].nome_pais, Validators.required],
      uf: ['', Validators.required],
      cep: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      addressComplement: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.personalInfo.profilePicture = event.target.result;
      }
    }
  }

  updateBankInfo(bankInfo: BankInfo) {
    this.bankInfo = bankInfo;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const formatedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    return formatedDate;
  }

  submitBtnIsDisabled(disabled) {
    this.submitBtnDisabled = disabled;
  }

  next() {
    this.pageTitle = 'Dados bancários (OPCIONAL)';
    this.user.displayName = this.form.value.name;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.passwordConfirmation = this.form.value.passwordConfirmation;
    this.personalInfo.issuingBody = this.form.value.issuingBody;
    this.personalInfo.rg = this.form.value.rg;
    this.personalInfo.cpf = this.form.value.cpf;
    this.personalInfo.ddi = this.form.value.ddi;
    this.personalInfo.birthDay = this.formatDate(this.form.value.birthDay.toString());
    this.personalInfo.phone = this.form.value.phone;
    this.personalInfo.profession = this.form.value.profession;
    this.personalInfo.civilStatus = this.form.value.civilStatus;
    this.personalInfo.country = this.form.value.country;
    this.personalInfo.uf = this.form.value.uf;
    this.personalInfo.cep = this.form.value.cep;
    this.personalInfo.city = this.form.value.city;
    this.personalInfo.address = this.form.value.address;
    this.personalInfo.number = this.form.value.number;
    this.personalInfo.addressComplement = this.form.value.addressComplement;
  }

  back() {
    this.pageTitle = 'Dados pessoais';
  }

  close() {
    this.dialogRef.close();
  }

  signUp() {
    this.authService.signUp(this.user, this.personalInfo, this.bankInfo);
    this.close();
  }

}
