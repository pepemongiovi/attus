import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UrlSerializer} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  @Output() invest = new EventEmitter();
  projects: Project[];
  selectedProjectIndex = 0;
  MAX_INVESTMENT_PERCENTAGE = 1.2;

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.fetchProjects().on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.projects = snapshot.val().filter((proj) => proj);
      }
    }, (err) => console.log(err));
  }

  selectProject(projectIndex) {
    this.selectedProjectIndex = projectIndex;
  }

  getPercentage(project) {
    const percentage = (project.captacaoAtual / project.captacaoNecessaria) * 100;
    return Math.round(percentage * 100) / 100;
  }

  onInvest(project) {
    this.projectService.setSelectedProject(project);
    this.invest.emit(true);
  }

  getProjects() {
    if(this.projects !== undefined) {
      return this.projects.filter((proj, index) => index > 0);
    }
  }

}
