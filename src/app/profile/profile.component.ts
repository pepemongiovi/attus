import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfileComponent>,
              private authService: AuthService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  logout() {
    this.authService.logout();
    this.close();
  }
}

