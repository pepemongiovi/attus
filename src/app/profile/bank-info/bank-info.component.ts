import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankInfo} from '../../models/bankInfo.model';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../shared/password-validation';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  @Input() showSaveButton;
  @Output() submitBtnStatusUpdate = new EventEmitter();
  @Output() updateBankInfo = new EventEmitter();
  bankInfo = new BankInfo();
  banks = require('../../../jsons/banks.json');
  form: FormGroup;

  ngOnInit() {
    this.fetchBankInfo();
  }

  createForm() {
    this.form = this.formBuilder.group({
      bankNumber: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      checkingAccount: ['', [Validators.required]]
    });
  }

  setBankInfo() {
    this.form.controls['bankNumber'].setValue(this.bankInfo.bankNumber);
    this.form.controls['agency'].setValue(this.bankInfo.agency);
    this.form.controls['checkingAccount'].setValue(this.bankInfo.checkingAccount);
  }

  fetchBankInfo() {
    if(JSON.parse(localStorage.getItem('user'))!=null) {
      this.userService.getBankInfo().on('value', (snapshot) => {
        if(snapshot.val() !== null) {
          this.bankInfo = snapshot.val();
          this.setBankInfo();
        }
      });
    }
  }

  onUpdateBankInfo() {
    this.userService.bankInfo = this.bankInfo;
    this.submitBtnStatusUpdate.emit(this.form.invalid);
    this.updateBankInfo.emit(this.bankInfo);
  }

  save() {
    this.userService.saveBankInfo(this.bankInfo);
  }
}
