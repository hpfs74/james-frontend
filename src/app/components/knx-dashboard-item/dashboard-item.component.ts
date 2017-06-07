import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from './../../models/dashboard-item';
import { insuranceTypes, InsuranceMap } from './../../models/insurance-map';

@Component({
  selector: 'knx-dashboard-item',
  template: `
    <knx-button-icon [label]="item.type | titleCase" [isPlaceholder]="isPlaceholder">
      <ng-container [ngSwitch]="item.insuranceType">
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

}
