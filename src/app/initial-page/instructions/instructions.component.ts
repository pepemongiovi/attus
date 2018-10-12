import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user.service';
import {InvestmentInfo} from '../../models/investmentInfo.model';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InstructionsComponent>,
              private userService: UserService) { }
  investmentInfo: InvestmentInfo;
  investmentInfoBtnDisabled = true;
  bankInfoBtnDisabled = false;
  saveBtnIsValid = true;
  pastInvestments;

  ngOnInit() {
    this.fetchUsersPastInvestments();
  }

  fetchUsersPastInvestments() {
    this.userService.getInvestments().on('value', (snapshot) => {
      this.pastInvestments = snapshot.val();
    }, (err) => console.log(err));
  }

  updateInvestmentInfo(investmentInfo) {
    this.investmentInfo = investmentInfo;
  }

  updateSaveBtnStatus(valid) {
    this.saveBtnIsValid = valid;
  }

  savePersonalInfo() {
    this.userService.savePersonalInfo(this.userService.personalInfo);
  }

  saveBankInfo() {
    this.userService.saveBankInfo(this.userService.bankInfo);
  }

  invest() {
    this.userService.saveInvestmentInfo(this.investmentInfo, this.pastInvestments, this.close());
  }

  investmentInfoBtnUpdate(disable) {
    this.investmentInfoBtnDisabled = disable;
  }

  bankInfoBtnUpdate(disable) {
    this.bankInfoBtnDisabled = disable;
  }

  close() {
    this.dialogRef.close();
  }

}
