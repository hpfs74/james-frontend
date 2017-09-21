import { Component, Input } from '@angular/core';
import { Feature } from '../../shared/models/feature';

@Component({
  selector: 'knx-features',
  template: `
  <div class="container knx-container--flat">
    <div class="knx-features">
      <div class="knx-features__item" *ngFor="let item of items">
        <div class="knx-features__title">{{ item.title }}</div>
        <div class="knx-features__description">{{ item.description }}</div>
      </div>
    </div>
  </div>
  `
})
export class FeaturesComponent {
  @Input() items: Array<Feature>;
}
