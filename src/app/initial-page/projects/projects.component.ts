import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  @Output() invest = new EventEmitter();

  ngOnInit() {
  }

  onInvest() {
    this.invest.emit(true);
  }

}
