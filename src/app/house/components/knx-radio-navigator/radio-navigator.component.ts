import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'knx-radio-navigator',
  templateUrl: './radio-navigator.component.html',
  styleUrls: ['./radio-navigator.component.scss']
})
export class RadioNavigatorComponent implements OnInit {
  @Input() label: string;
  @Input() values: any[];
  @Input() selected: string;
  @Output() onSelectChange: EventEmitter<any> = new EventEmitter<any>();
  currentValue: string;
  currentIndex: number;

  constructor() {
    this.currentIndex = 0;
  }

  ngOnInit() {
    this.currentIndex = this.values.findIndex( data => data.value === this.selected);
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }

    this.currentValue = this.values[this.currentIndex].label;
    this.onSelectChange.emit(this.currentIndex);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentValue = this.values[--this.currentIndex].label;
      this.onSelectChange.emit(this.currentIndex);
    }
  }

  next() {
    if (this.currentIndex < this.values.length - 1) {
      this.currentValue = this.values[++this.currentIndex].label;
      this.onSelectChange.emit(this.currentIndex);
    }
  }
}

