import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['./investment-info.component.css']
})
export class InvestmentInfoComponent implements OnInit {

  constructor() { }

  @Output() submitBtnStatusUpdate = new EventEmitter();
  user = JSON.parse(localStorage.getItem('user')).user;
  projects = [{ id: '1', name: 'Project 1' }, { id: '1', name: 'Project 2' }];
  selectedProjectId;
  investmentValue: number;
  investmentForm: FormGroup;

  ngOnInit() {
    this.investmentForm = new FormGroup({
      'selectedProjectId': new FormControl('', [
        Validators.required
      ]),
      'quotas': new FormControl('', [
        Validators.required
      ]),
      'investmentValue': new FormControl('', [
        Validators.required
      ])
    });
    console.log(this.investmentForm);
  }

  quotasIsValid() {
    let isValid = true;
    let quotas = this.investmentForm.value.quotas;
    if(quotas!=='' && (isNaN(quotas) || quotas<=0)) {
      isValid = false;
    }
    return isValid;
  }

  investmentValueIsValid() {
    let isValid = true;
    let investmentValue = this.investmentForm.value.investmentValue;
    if(investmentValue!=='' && (isNaN(investmentValue) || investmentValue<=0)) {
      isValid = false;
    }
    return isValid;
  }

  disableSubmit() {
    let projectNotSelected = this.investmentForm.value.selectedProjectId === '';
    let quotasEmpty = this.investmentForm.value.quotas === '';
    let investmentValueEmpty = this.investmentForm.value.investmentValue === '';
    this.submitBtnStatusUpdate.emit(
      !this.investmentValueIsValid() || !this.quotasIsValid() || projectNotSelected
      || quotasEmpty || investmentValueEmpty
    );
  }
}
