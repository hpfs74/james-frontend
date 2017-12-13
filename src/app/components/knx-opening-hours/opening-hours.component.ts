import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

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
export class OpeningHoursComponent implements OnInit, OnDestroy {
  @Input() schedule: any;

  public isOpen: boolean;
  public defaultSchedule = {
    Sun: { 'start': 8, 'end': 22 },
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
  private pollTime$: Subscription;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.schedule) {
      this.schedule = this.defaultSchedule;
    }
    const currentDate = new Date();
    this.updateIsOpen(currentDate);

    this.pollTime$ = Observable.interval(900000 /* every 15 min. */)
    .subscribe(() => {
      this.updateIsOpen(new Date());
    });
  }

  ngOnDestroy() {
    this.pollTime$.unsubscribe();
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

    // manual mark for changes to support OnPush strategy
    this.cd.markForCheck();
  }
}
