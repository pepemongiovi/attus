import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankInfo} from '../../models/bankInfo.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Input() showSaveButton;
  @Output() submitBtnStatusUpdate = new EventEmitter();
  @Output() updateBankInfo = new EventEmitter();
  bankInfo = new BankInfo();
  banks = require('../../../jsons/banks.json');

  ngOnInit() {
    this.fetchBankInfo();
  }

  fetchBankInfo() {
    if(JSON.parse(localStorage.getItem('user'))!=null) {
      this.userService.getBankInfo().on('value', (snapshot) => {
        if(snapshot.val() !== null) {
          this.bankInfo = snapshot.val();
        }
      });
    }
  }

  onUpdateBankInfo() {
    this.userService.bankInfo = this.bankInfo;
  }

  numberIsValid(num) {
    let isValid = true;
    if (num !== undefined && (isNaN(num) || num <= 0)) {
      isValid = false;
    }
    return isValid;
  }

  save() {
    this.userService.saveBankInfo(this.bankInfo);
  }

  disableSaveBtn() {
    const disabled = !this.numberIsValid(this.bankInfo.checkingAccount)
      || !this.numberIsValid(this.bankInfo.agency)
      || !this.numberIsValid(this.bankInfo.bankNumber)
      || this.bankInfo.agency === undefined
      || this.bankInfo.bankNumber === undefined
      || this.bankInfo.checkingAccount === undefined;

    this.submitBtnStatusUpdate.emit(disabled);

    if (!disabled) this.updateBankInfo.emit(this.bankInfo);

    return disabled;
  }
}
