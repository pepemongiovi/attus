import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonalInfo} from '../../../models/personalInfo.model';
import {UserService} from '../../../services/user.service';
import {BankInfo} from '../../../models/bankInfo.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Output() logout = new EventEmitter();
  @Output() updateSaveBtnStatus = new EventEmitter();
  @Input() showButtons;
  user = JSON.parse(localStorage.getItem('user')).user;
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];
  countries = require('../../../../jsons/countries.json');
  personalInfo = new PersonalInfo();
  selectedDate;
  loading = true;

  ngOnInit() {
    this.fetchPersonalInfo();
  }

  fetchPersonalInfo() {
    this.userService.getPersonalInfo().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.personalInfo = snapshot.val();
      }
      this.loading = false;
    });
  }

  onUpdateSaveBtnStatus() {
    this.updateSaveBtnStatus.emit(this.infoIsValid());
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
    this.userService.savePersonalInfo(this.personalInfo);
    this.userService.saveUserInfo(this.user);
  }

  numberIsValid(num) {
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isValid = true;
    if (num !== undefined && (isNaN(num) || num <= 0)) {
      isValid = false;
    }
    if (num) {
      isValid = isValid && !format.test(num.toString());
    }
    return isValid ;
  }

  textIsValid(text) {
    if(text) {
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      return !format.test(text) && text.length > 0 && !(/\d/.test(text));
    }
    return true;
  }

  emailIsValid() {
    const email = this.user.email;
    if (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    return true;
  }

  phoneIsValid() {
    if(this.personalInfo.phone) {
      const valid = this.numberIsValid(this.personalInfo.phone);
      return valid && this.personalInfo.phone.toString().length > 7;
    }
    return true;
  }

  setDate() {
    const nums = this.personalInfo.birthDay.split('/');
    this.selectedDate = new Date(parseInt(nums[2], 10), parseInt(nums[1], 10)-1, parseInt(nums[0], 10));
  }

  onDateChange(date) {
    this.personalInfo.birthDay = this.formatDate(date);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const formatedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return formatedDate;
  }

  birthDayIsValid() {
    if(this.personalInfo.birthDay) {
      if(this.personalInfo.birthDay.includes('/')){
        this.setDate();
      }
    }
    if(this.personalInfo.birthDay) {
      return this.personalInfo.birthDay;
    }
    return true;
  }

  cpfIsValid() {
    const cpf = this.personalInfo.cpf;
    if(cpf) {
      return this.numberIsValid(parseInt(cpf, 10)) && cpf.length === 11;
    }
    return true;
  }

  infoIsValid() {
    return this.user.displayName && this.user.email && this.personalInfo.phone
      && this.personalInfo.issuingBody && this.personalInfo.rg && this.personalInfo.cpf
      && this.personalInfo.profession && this.personalInfo.country && this.personalInfo.uf
      && this.personalInfo.cep && this.personalInfo.city && this.personalInfo.address
      && this.personalInfo.number && this.personalInfo.addressComplement
      && this.personalInfo.birthDay && this.personalInfo.civilStatus && this.personalInfo.ddi &&
      this.textIsValid(this.user.displayName) && this.emailIsValid() &&
      this.numberIsValid(this.personalInfo.ddi) && this.phoneIsValid() &&
      this.birthDayIsValid() && this.textIsValid(this.personalInfo.issuingBody) &&
      this.numberIsValid(this.personalInfo.rg) && this.cpfIsValid() &&
      this.textIsValid(this.personalInfo.profession) && this.textIsValid(this.personalInfo.country) &&
      this.textIsValid(this.personalInfo.uf) && this.numberIsValid(this.personalInfo.cep) &&
      this.textIsValid(this.personalInfo.city) && this.textIsValid(this.personalInfo.address) &&
      this.numberIsValid(this.personalInfo.number) && this.textIsValid(this.personalInfo.addressComplement);
  }
}
