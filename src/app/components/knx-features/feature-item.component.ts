import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-feature-item',
  template: `
  <div class="knx-features__item">
    <div class="knx-features__title">{{ title }}</div>
    <div class="knx-features__description">{{ description }}</div>
  </div>
  `
})

export class FeatureItemComponent {
  @Input() title: string;
  @Input() description: string;
}
