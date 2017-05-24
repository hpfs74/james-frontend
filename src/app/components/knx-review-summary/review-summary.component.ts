import { Component, OnInit, Input } from '@angular/core';
import { Rating } from '../../models/rating';

@Component({
  selector: 'knx-review-summary',
  template: `
    <div class="knx-review-summary">
      <div class="knx-review-summary__title">Gemiddeld een {{total}} uit {{reviewCount}} reviews:</div>

      <div class="container knx-review-summary__rating">
        <div class="row" *ngFor="let item of items">
          <div class="col-sm-4">
            <div class="knx-review-summary__label">{{ item.label }}</div>
          </div>
          <div class="col-sm-8">
            <knx-star-rating class="knx-review-summary__stars" [rating]="item.value" total="5"></knx-star-rating>
          </div>
        </div>
    </div>
  `
})
export class ReviewSummaryComponent {
  @Input() total: number;
  @Input() reviewCount: number;
  @Input() items: Array<Rating>;
}
