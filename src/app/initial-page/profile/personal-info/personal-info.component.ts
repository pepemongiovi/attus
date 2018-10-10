import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonalInfo} from '../../../models/personalInfo.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Output() logout = new EventEmitter();
  @Input() showButtons;
  user = JSON.parse(localStorage.getItem('user')).user;
  civilStatus = ['Solteiro(a)', 'Casado(a)', 'Separdo(a)', 'Divorciado(a)', 'Viúvo(a)'];
  countries = require('../../../../jsons/countries.json');
  personalInfo = new PersonalInfo();

  ngOnInit() {
    this.fetchPersonalInfo();
  }

  fetchPersonalInfo() {
    this.userService.getPersonalInfo().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.personalInfo = snapshot.val();
      }
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.personalInfo.profilePicture = event.target.result;
      }
    }
  }

  onLogout() {
    this.logout.emit(true);
  }

  save() {
    this.userService.savePersonalInfo(this.personalInfo);
    this.userService.saveUserInfo(this.user);
  }
}
