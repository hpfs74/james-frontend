import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-data-summary',
  template: `
    <knx-collapsible-panel title="{{title}}">
      <ng-content select="knx-data-summary-group"></ng-content>
    </knx-collapsible-panel>
  `
})
export class DataSummaryComponent {
  @Input() title: string;
}

