import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-feature-item',
  styleUrls: ['./feature-item.component.scss'],
  template: `
  <div class="knx-feature-item">
    <div class="knx-feature-item__title">{{ title }}</div>
    <div class="knx-feature-item__description">{{ description }}</div>
  </div>
  `
})
export class FeatureItemComponent {
  @Input() title: string;
  @Input() description: string;
}
