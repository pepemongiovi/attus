import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  constructor() { }

  @Input() showSaveButton;
  @Output() submitBtnStatusUpdate = new EventEmitter();
  user = JSON.parse(localStorage.getItem('user')).user;
  banks = require('../../../../jsons/banks.json');

  ngOnInit() {
  }

  numberIsValid(num) {
    let isValid = true;
    if(num!==undefined && (isNaN(num) || num<=0)) {
      isValid = false;
    }
    return isValid;
  }

  save() {
  }

  disableSaveBtn() {
    let disabled = !this.numberIsValid(this.user.checkingAccount)
      || !this.numberIsValid(this.user.agency)
      || !this.numberIsValid(this.user.bankNumber)
      || this.user.agency===undefined || this.user.bankNumber===undefined
      || this.user.checkingAccount===undefined;
    this.submitBtnStatusUpdate.emit(disabled);
    return disabled;
  }
}
