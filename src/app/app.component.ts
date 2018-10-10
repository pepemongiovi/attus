import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyChaLKvUCu6lsakLE04NrEtl1gfKdHXCGc',
      authDomain: 'attus-4fdcb.firebaseapp.com',
      databaseURL: 'https://attus-4fdcb.firebaseio.com',
      projectId: 'attus-4fdcb',
      storageBucket: 'attus-4fdcb.appspot.com',
      messagingSenderId: '68863119549'
    });
  }

}
