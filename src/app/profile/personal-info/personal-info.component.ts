import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonalInfo} from '../../models/personalInfo.model';
import {UserService} from '../../services/user.service';
import {BankInfo} from '../../models/bankInfo.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../shared/password-validation';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  @Output() logout = new EventEmitter();
  @Output() updateSaveBtnStatus = new EventEmitter();
  @Input() showButtons;
  user = JSON.parse(localStorage.getItem('user')).user;
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];
  countries = require('../../../jsons/countries.json');
  personalInfo = new PersonalInfo();
  loading = true;
  form: FormGroup;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
    this.fetchPersonalInfo();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [this.user.displayName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      issuingBody: [this.personalInfo.issuingBody, Validators.required],
      rg: [this.personalInfo.rg, Validators.required],
      cpf: [this.personalInfo.cpf, Validators.required],
      birthDay: [this.personalInfo.birthDay, Validators.required],
      ddi: ['55', Validators.required],
      phone: [this.personalInfo.phone, Validators.required],
      profession: [this.personalInfo.profession, Validators.required],
      civilStatus: [this.personalInfo.civilStatus, Validators.required],
      country: [this.personalInfo.country, Validators.required],
      uf: [this.personalInfo.uf, Validators.required],
      cep: [this.personalInfo.cep, Validators.required],
      city: [this.personalInfo.city, Validators.required],
      address: [this.personalInfo.address, Validators.required],
      number: [this.personalInfo.number, Validators.required],
      addressComplement: [this.personalInfo.addressComplement, Validators.required]
    });
  }

  fetchPersonalInfo() {
    this.userService.getPersonalInfo().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.personalInfo = snapshot.val();
      }
      this.setDate();
      this.createForm();
      this.loading = false;
    });
  }

  onUpdateSaveBtnStatus() {
    this.updateSaveBtnStatus.emit(!this.form.invalid);
  }

  onUpdatePersonalInfo() {
    this.userService.personalInfo = this.personalInfo;
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

  onLogout() {
    this.logout.emit(true);
  }

  save() {
    this.personalInfo.birthDay = this.form.value.birthDay;
    this.userService.savePersonalInfo(this.personalInfo);
    this.userService.saveUserInfo(this.user);
  }

  setDate() {
    if (this.personalInfo.birthDay) {
      const nums = this.personalInfo.birthDay.split('/');
      this.personalInfo.birthDay = new Date(parseInt(nums[2], 10), parseInt(nums[1], 10)-1, parseInt(nums[0], 10));

    }
  }
}
