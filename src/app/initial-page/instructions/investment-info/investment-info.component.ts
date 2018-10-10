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
  projects = [{ id: '1', name: 'Project 1', quotaValue: 800 }, { id: '1', name: 'Project 2', quotaValue: 600 }];
  investmentForm: FormGroup;

  ngOnInit() {
    this.investmentForm = new FormGroup({
      'selectedProject': new FormControl('', [
        Validators.required
      ]),
      'quotas': new FormControl('', [
        Validators.required
      ]),
      'investmentValue': new FormControl('', [
        Validators.required
      ])
    });
  }

  quotasIsValid() {
    let isValid = true;
    const quotas = this.investmentForm.value.quotas;
    if(quotas !== '' && (isNaN(quotas) || quotas <= 0)) {
      isValid = false;
    }
    return isValid;
  }

  investmentValueIsValid() {
    let isValid = true;
    const investmentValue = this.investmentForm.value.investmentValue;
    if(investmentValue !== '' && (isNaN(investmentValue) || investmentValue <= 0)) {
      isValid = false;
    }
    return isValid;
  }

  disableSubmit() {
    const projectNotSelected = this.investmentForm.value.selectedProject === '';
    const quotasEmpty = this.investmentForm.value.quotas === '';
    const investmentValueEmpty = this.investmentForm.value.investmentValue === '';
    this.submitBtnStatusUpdate.emit(
      !this.investmentValueIsValid() || !this.quotasIsValid() || projectNotSelected
      || quotasEmpty || investmentValueEmpty
    );
  }
}
