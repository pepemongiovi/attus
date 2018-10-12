import {Component, Input, OnInit} from '@angular/core';
import {RippleAnimationConfig} from '@angular/material';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  selectedImgIndex = 0;
  @Input() imgsUrl;

  ngOnInit() {
    setInterval(() => this.next(), 10000);
  }

  back() {
    if(this.selectedImgIndex===0) {
      this.selectedImgIndex = this.imgsUrl.length - 1;
    }
    else {
      this.selectedImgIndex-=1;
    }
  }

  next() {
    if(this.selectedImgIndex===this.imgsUrl.length -1) {
      this.selectedImgIndex = 0;
    }
    else {
      this.selectedImgIndex+=1;
    }
  }
}
