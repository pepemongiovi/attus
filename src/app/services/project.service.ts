import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Project} from '../models/project.model';

@Injectable()
export class ProjectService {
  constructor (private afAuth: AngularFireAuth,
               private afDababase: AngularFireDatabase) {}

  private selectedProject: Project;
  projects;

  getSelectedProject() {
    return this.selectedProject;
  }

  setSelectedProject(proj) {
    this.selectedProject = proj;
  }

  fetchProjects() {
    return firebase.database().ref('/projects');
  }

  saveProject(proj) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDababase.object('projects/2').set(proj);
    });
  }
}
