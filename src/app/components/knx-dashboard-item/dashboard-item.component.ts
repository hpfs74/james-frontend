import { Component, OnInit, Input } from '@angular/core';
import { Insurance } from './../../insurance/models/insurance';
import { insuranceTypes, InsuranceMap } from './../../insurance/models/insurance-type';
import { ImageConfig } from '../knx-circle-progress/circle-progress-image';

@Component({
  selector: 'knx-dashboard-item',
  styleUrls: ['./dashboard-item.component.scss'],
  template: `
    <div class="knx-dashboard-item" [class.knx-dashboard-item--placeholder]="isPlaceholder">
      <knx-circle-progress #circleProg1
        [uniqueId]="index"
        [imageConfig]="image"
        [percent]="item.filled_data_percentage || 0"
        [animateOnLoad]="true"
        [boxSize]="140"
        [radius]="65"
        [color]="'#eeebe5'"
        [backgroundColor]="'#eeebe5'"
        [lowColor]="'#00a4a7'"
        [middleColor]="'#00a4a7'"
        [interColor]="'#00a4a7'"
        [highColor]="'#00a4a7'"
        [border]="9"
        [time]="0.4">
      </knx-circle-progress>
      <span *ngIf="item.label" class="knx-dashboard-item__label">{{ item.label }}</span>
    </div>
  `
})
export class DashboardItemComponent implements OnInit {
  @Input() item: Insurance;
  @Input() isPlaceholder: boolean;
  @Input() index: number;

  defaultImages = {
    car: '/assets/images/icon-car.svg',
    travel: '/assets/images/icon-travel.svg',
    content: '/assets/images/icon-content.svg',
    home: '/assets/images/icon-home.svg',
    liability: '/assets/images/icon-liability.svg'
  };

  image: ImageConfig;

  ngOnInit() {
    if (this.item.insurance_logo) {
      this.image = {
        url: this.item.insurance_logo,
        width: 90,
        height: 90,
        x: 10,
        y: 15
      };
    } else {
      this.image = {
        url: this.defaultImages[this.item.type],
        width: 60,
        height: 60,
        x: 25,
        y: 25
      };
    }
  }

}
