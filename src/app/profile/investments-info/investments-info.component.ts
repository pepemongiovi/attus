import { Component, OnInit } from '@angular/core';
import {InvestmentInfo} from '../../models/investmentInfo.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-investments-info',
  templateUrl: './investments-info.component.html',
  styleUrls: ['./investments-info.component.css']
})
export class InvestmentsInfoComponent implements OnInit {

  constructor(private userService: UserService) { }

  STATUS_IN_PROGRESS = 'EM ANDAMENTO';

  investments: InvestmentInfo[];

  ngOnInit() {
    this.fetchInvestments();
  }

  fetchInvestments() {
    this.userService.getInvestments().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.investments = snapshot.val();
      }
    });
  }

  getIncome(investment) {
    if(investment.income === 0) {
      return '--';
    }
    else return 'R$ ' + investment.income;
  }

}
