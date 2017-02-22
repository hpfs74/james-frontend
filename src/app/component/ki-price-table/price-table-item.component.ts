import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-price-table-item',
  template: `<div class="knab-pricing-table" [ngClass]="{'knab-pricing-table--highlight': Highlight  }">
  <div class="knab-pricing-table__header" >
    {{Header}}
  </div>
  <ul class="knab-pricing-table__features">
    <li *ngFor="let item of Features">{{item}}</li>
  </ul>
  <div class="knab-pricing-table__price">
    vanaf <span class="knab-pricing-table__price-amount">&euro; {{Price}}</span>
  </div>
</div>
`,
})
export class PriceTableItemComponent {
  project: string = 'KNAB';

  @Input() Header: string;
  @Input() Price: number;
  @Input() Features: Array<string>;
  @Input() Highlight: boolean = false;
}
