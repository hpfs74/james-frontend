import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'knx-data-summary-group',
  template: `
    <div class="knx-collapsible-panel__content">
      <ng-content select="knx-data-summary-row"></ng-content>
    </div>`
})
export class DataSummaryGroupComponent {}
