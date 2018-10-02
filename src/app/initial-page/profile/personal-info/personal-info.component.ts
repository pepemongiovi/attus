import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor() { }

  @Output() logout = new EventEmitter();
  @Input() showSaveButton;
  user = JSON.parse(localStorage.getItem('user')).user;
  countries = require('../../../../jsons/countries.json');
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];

  ngOnInit() {
    this.user.country = this.countries[29].nome_pais;
  }

  onLogout() {
    this.logout.emit(true);
  }

  save() {

  }


}
