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
  imgsUrl = ['https://static.pexels.com/photos/6526/sea-beach-holiday-vacation-large.jpg'];

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
