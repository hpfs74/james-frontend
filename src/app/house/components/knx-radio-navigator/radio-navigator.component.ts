import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'knx-radio-navigator',
  templateUrl: './radio-navigator.component.html',
  styleUrls: ['./radio-navigator.component.scss']
})
export class RadioNavigatorComponent implements OnInit {
  @Input() label: string;
  @Input() values: any[];
  currentValue: string;
  currentIndex: number;

  constructor() {
    this.currentIndex = 0;
    // if (this.values) {
    //   this.currentValue = this.values[this.currentIndex];
    // }


  }

  ngOnInit() {
    this.currentValue = this.values[this.currentIndex].label;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentValue = this.values[--this.currentIndex].label;
    }
  }

  next() {
    if (this.currentIndex < this.values.length - 1) {
      this.currentValue = this.values[++this.currentIndex].label;
    }
  }
}

