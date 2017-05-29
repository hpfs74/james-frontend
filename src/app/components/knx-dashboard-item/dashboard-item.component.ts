import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from './../../models/dashboard-item';

@Component({
  selector: 'knx-dashboard-item',
  template: `
    <knx-button-icon [label]="labelMap[item.type] | titleCase" [isPlaceholder]="isPlaceholder">
      <ng-container [ngSwitch]="item.type">
        <div *ngSwitchDefault>Unkown type!!</div>
        <img *ngSwitchCase="'car'" class="knx-button-icon__icon" src="/assets/images/icon-car.svg">
        <img *ngSwitchCase="'travel'" class="knx-button-icon__icon" src="/assets/images/icon-travel.svg">
        <img *ngSwitchCase="'content'" class="knx-button-icon__icon" src="/assets/images/icon-content.svg">
        <img *ngSwitchCase="'home'" class="knx-button-icon__icon" src="/assets/images/icon-home.svg">
        <img *ngSwitchCase="'liability'" class="knx-button-icon__icon" src="/assets/images/icon-liability.svg">
      </ng-container>
    </knx-button-icon>
  `
})
export class DashboardItemComponent {
  @Input() item: DashboardItem;
  @Input() isPlaceholder: boolean;

  public labelMap = {
    car: 'Auto',
    travel: 'Reis',
    content: 'Inboedel',
    home: 'Opstal',
    liability: 'Aansprakelijkheid'
  };
}
