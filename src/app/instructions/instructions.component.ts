import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../services/user.service';
import {InvestmentInfo} from '../models/investmentInfo.model';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InstructionsComponent>,
              private userService: UserService,
              private projectService: ProjectService) { }
  investmentInfo: InvestmentInfo;
  selectedProject = this.projectService.getSelectedProject();
  investmentInfoBtnDisabled = true;
  bankInfoBtnDisabled = false;
  savePersonalInfoBtnIsValid = true;
  pastInvestments;
  MAX_INVESTMENT_PERCENTAGE = 1.2;

  ngOnInit() {
    this.fetchUsersPastInvestments();
  }

  fetchUsersPastInvestments() {
    this.userService.getInvestments().on('value', (snapshot) => {
      this.pastInvestments = snapshot.val();
    }, (err) => console.log(err));
  }

  getQuotasLimit() {
    return ((this.selectedProject.captacaoNecessaria * this.MAX_INVESTMENT_PERCENTAGE)
      - this.selectedProject.captacaoAtual) / this.selectedProject.valorDeCota;
  }

  updateInvestmentInfo(investmentInfo) {
    this.investmentInfo = investmentInfo;
  }

  updatePersonalSaveBtnStatus(valid) {
    this.savePersonalInfoBtnIsValid = valid;
  }

  savePersonalInfo() {
    this.userService.savePersonalInfo(this.userService.personalInfo);
  }

  saveBankInfo() {
    this.userService.saveBankInfo(this.userService.bankInfo);
  }

  invest() {
    this.userService.saveInvestmentInfo(this.investmentInfo, this.pastInvestments);
    this.close();
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
