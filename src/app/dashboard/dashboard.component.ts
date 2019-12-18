import { Component, OnInit } from '@angular/core';
import {InstructionsComponent} from '../instructions/instructions.component';
import {MatDialogRef} from '@angular/material';
import {InvestmentInfo} from '../models/investmentInfo.model';
import {UserService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
              private userService: UserService,
              private projectService: ProjectService) { }

  STATUS_PENDING = 'PENDENTE';
  STATUS_IN_PROGRESS = 'EM ANDAMENTO';
  STATUS_FINISHED = 'FINALIZADO';

  investments: InvestmentInfo[];
  investmentsOldVersion: InvestmentInfo[];
  userEmail;
  userUID;
  projects;
  loading = false;
  searched = false;

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.fetchProjects().on('value', (snapshot) => {
      this.projects = snapshot.val();
    });
  }

  updateProjects() {
    this.investments.filter((inv, j) => {
      if(inv.status !== this.STATUS_PENDING && this.investmentsOldVersion[j].status === this.STATUS_PENDING) {
        this.projects.filter((p,i) => {
          if(p.name === inv.project) {
            this.projects[i].captacaoAtual += inv.value;
          }
        })
      }
      else if(inv.status === this.STATUS_PENDING && this.investmentsOldVersion[j].status !== this.STATUS_PENDING){
        this.projects.filter((p,i) => {
          if(p.name === inv.project) {
            this.projects[i].captacaoAtual -= inv.value;
          }
        });
      }
    });
    this.projectService.saveProjects(this.projects);
  }

  searchUser() {
    this.loading = true;
    this.userService.getUserByEmail(this.userEmail).subscribe((user: any) => {
      this.userUID  = user.uid;
      this.searched = true;
      this.userService.getInvestmentsByUID(user.uid).on('value', (snapshot) => {
        this.investments = snapshot.val();
        this.investmentsOldVersion = snapshot.val();
        this.loading = false;
      });
    }, () => {
      this.loading = false;
      this.investments = undefined;
      this.searched = true;
    });
  }

  getIncome(investment) {
    if(investment.income === 0) {
      return '--';
    }
    else return 'R$ ' + investment.income;
  }

  save() {
    this.updateProjects();
    this.userService.saveInvestments(this.userUID, this.investments);
  }

  close() {
    this.dialogRef.close();
  }

}
