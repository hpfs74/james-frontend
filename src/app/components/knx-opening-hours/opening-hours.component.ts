import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'knx-opening-hours',
  styleUrls: ['./opening-hours.component.scss'],
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
    Sun: { 'start': 8, 'end': 20 },
    Mon: { 'start': 8, 'end': 20 },
    Tue: { 'start': 8, 'end': 20 },
    Wed: { 'start': 8, 'end': 20 },
    Thu: { 'start': 8, 'end': 20 },
    Fri: { 'start': 8, 'end': 20 },
    Sat: { 'start': 8, 'end': 20 },
    holidays: null
  };
  public message: string;

  private dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    if (!this.schedule) {
      this.schedule = this.defaultSchedule;
    }
    const currentDate = new Date();
    this.updateIsOpen(currentDate);
  }

  updateIsOpen(date: Date): void {
    const hours = date.getHours();

    const todaySchedule = this.schedule[this.dow[date.getDay()]];
    if (todaySchedule.start <= hours && todaySchedule.end >= hours) {
      this.isOpen = true;
      this.message = 'Nu open (tot ' + todaySchedule.end + ':00)';
    } else {
      this.isOpen = false;
      this.message = 'Nu gesloten';
    }
  }
}
