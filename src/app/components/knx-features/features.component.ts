import { Component, Input } from '@angular/core';
import { Feature } from '../../models/feature';

@Component({
  selector: 'knx-features',
  template: `
  <div class="container-fluid knx-container--fullwidth knx-container--gray">
    <div class="knx-features row">
      <div class="knx-features__item col-sm-{{ 12/items.length}}" *ngFor="let item of items">
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
