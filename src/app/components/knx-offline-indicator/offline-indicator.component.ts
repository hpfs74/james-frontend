import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

import { slideUpDownAnimation } from '../../shared/animations/slide-up-down.animation';

@Component({
  selector: 'knx-offline-bar',
  styleUrls: ['./offline-indicator.component.scss'],
  template: `
    <div [hidden]="!show" [@slideUpDownAnimation]="getAnimationState()" class="knx-offline-bar">
      <div class="knx-offline-bar__message">
        Je internet verbinding is verbroken ...
      </div>
    </div>`,
  animations: [slideUpDownAnimation]
})
export class OfflineBarComponent {
  @Input() show: boolean;

  getAnimationState() {
    return this.show ? 'in' : 'out';
  }
}

@Component({
  selector: 'knx-offline-indicator',
  template: `
    <knx-offline-bar [show]="!(isConnected$ | async)"></knx-offline-bar>
  `
})
export class OfflineIndicatorComponent {
  isConnected$: Observable<boolean>;

  constructor() {
    this.isConnected$ = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }
}
