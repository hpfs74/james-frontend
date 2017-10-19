import { Component, OnInit, Input } from '@angular/core';

import { Rating } from '../../shared/models/rating';

@Component({
  selector: 'knx-star-rating',
  styleUrls: ['./star-rating.component.scss'],
  template: `
    <div class="knx-star-rating">
      <span *ngFor="let star of innerRating" class="knx-icon-star"></span>
      <span *ngFor="let star of remaining" class="knx-star-rating__remaining knx-icon-star"></span>
      <span class="knx-star-rating__number">{{ rating | number : '1.1-2'}}</span>
    </div>
  `
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() total: number;

  innerRating: Array<any>;
  remaining: Array<any>;

  ngOnInit() {
    this.innerRating = Array(this.rating).fill('.');
    this.remaining = Array(this.total - this.innerRating.length);
  }
}
