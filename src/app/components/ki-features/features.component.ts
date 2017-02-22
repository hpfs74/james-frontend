import { Component, Input } from '@angular/core';
import { Feature } from '../../models/feature';

@Component({
  selector: 'ki-features',
  template: `
  <div class="cx-container-fluid container--fullwidth container-features">
    <div class="cx-container container-features-inner">
      <div class="feature" *ngFor="let item of items">
        <div class="feature__title">{{ item.title }}</div>
        <div class="feature__description">{{ item.description }}</div>
    </div>
    </div>
    </div>
  `
})
export class FeaturesComponent {
  @Input() items: Array<Feature>;
}
