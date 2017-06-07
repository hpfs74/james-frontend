import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'knx-opening-hours',
  template: `
    <div class="knx-opening-hours">
      <span class="knx-opening-hours__icon knx-icon-dot-circle-o"
        [ngClass]="{ 'knx-opening-hours__icon--open': isOpen,  'knx-opening-hours__icon--closed': !isOpen }"></span>
      <span class="knx-opening-hours__message">{{ message }}</span>
    </div>
  `
})
export class OpeningHoursComponent implements OnInit {
  @Input() schedule: any;

  public isOpen: boolean;
  public defaultSchedule = {
    Sun: { 'start': -1, 'end': -1 },
    Mon: { 'start': 8, 'end': 22 },
    Tue: { 'start': 8, 'end': 22 },
    Wed: { 'start': 8, 'end': 22 },
    Thu: { 'start': 8, 'end': 22 },
    Fri: { 'start': 8, 'end': 22 },
    Sat: { 'start': 8, 'end': 22 },
    holidays: null
  };
  public message: string;

  private dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    if (!this.schedule) {
      this.schedule = this.defaultSchedule;
    }
    let currentDate = new Date();
    this.updateIsOpen(currentDate);
  }

  updateIsOpen(date: Date): void {
    let hours = date.getHours();

    let todaySchedule = this.schedule[this.dow[date.getDay()]];
    if (todaySchedule.start <= hours && todaySchedule.end >= hours) {
      this.isOpen = true;
      this.message = 'Nu open (tot ' + todaySchedule.end + ':00)';
    } else {
      this.isOpen = false;
      this.message = 'Nu gesloten';
    }
  }
}
