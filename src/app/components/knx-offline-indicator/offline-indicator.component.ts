import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import { slideUpDownAnimation } from '../../shared/animations/slide-up-down.animation';

@Component({
  selector: 'knx-offline-indicator',
  template: `
    <div *ngIf="!(isConnected | async)"
      [@slideUpDownAnimation]="!(isConnected | async) ? 'in' : 'out'" class="knx-offline-indicator">
        <div class="knx-offline-indicator__message">Je internet verbinding is verbroken ...</div>
    </div>
  `,
  animations: [slideUpDownAnimation]
})
export class OfflineIndicatorComponent implements OnInit {
  isConnected: Observable<boolean>;
  animationState: string;

  constructor() {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }

  ngOnInit() {
  }
}
