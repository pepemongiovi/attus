import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {InvestmentInfo} from '../../../models/investmentInfo.model';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project.model';

@Component({
  selector: 'app-investment-info',
  templateUrl: './investment-info.component.html',
  styleUrls: ['./investment-info.component.css']
})
export class InvestmentInfoComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  @Output() submitBtnStatusUpdate = new EventEmitter();
  @Output() updateInvestmentInfo = new EventEmitter();
  user = JSON.parse(localStorage.getItem('user')).user;
  investmentForm: FormGroup;
  STATUS_IN_PROGRESS = 'EM ANDAMENTO';
  selectedProject: Project;

  ngOnInit() {
    this.createForm();
    this.fetchSelectedProject();
  }

  fetchSelectedProject() {
    this.selectedProject = this.projectService.getSelectedProject();
  }

  createForm() {
    this.investmentForm = new FormGroup({
      'quotas': new FormControl('', [
        Validators.required
      ])
    });
  }

  getTotalInvestmentValue() {
    if(!isNaN(this.investmentForm.value.quotas) && !isNaN(this.selectedProject.valorDeCota)){
      return this.investmentForm.value.quotas * this.selectedProject.valorDeCota;
    }
    return '--';
  }

  investmentInfoUpdate() {
    const info = new InvestmentInfo(
      this.selectedProject.name,
      this.investmentForm.value.quotas * this.selectedProject.valorDeCota,
      0,
      this.STATUS_IN_PROGRESS,
      this.investmentForm.value.quotas,
      this.selectedProject.valorDeCota);
    this.updateInvestmentInfo.emit(info);
  }

  quotasIsValid() {
    const quotas = this.investmentForm.value.quotas;
    if(!quotas) return true;
    let isValid = quotas <= this.getQuotasLimit();
    if(quotas !== '' && (isNaN(quotas) || quotas <= 0)) {
      isValid = false;
    }
    return isValid;
  }

  getQuotasLimit() {
    return (this.selectedProject.captacaoNecessaria - this.selectedProject.captacaoAtual) / this.selectedProject.valorDeCota;
  }

  disableSubmit() {
    const quotasEmpty = this.investmentForm.value.quotas === '';
    this.submitBtnStatusUpdate.emit(!this.quotasIsValid() || quotasEmpty);
  }
}
