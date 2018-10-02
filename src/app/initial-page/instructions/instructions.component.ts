import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InstructionsComponent>) { }

  investmentInfoBtnDisabled = true;
  bankInfoBtnDisabled = false;

  ngOnInit() {
  }

  investmentInfoBtnUpdate(disable) {
    this.investmentInfoBtnDisabled = disable;
  }

  bankInfoBtnUpdate(disable) {
    console.log(disable);
    this.bankInfoBtnDisabled = disable;
  }

  close() {
    this.dialogRef.close();
  }

}
