import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'knx-data-summary-group',
  template: `
    <div>
      <ng-content select="knx-data-summary-row"></ng-content>
    </div>`
})
export class DataSummaryGroupComponent {}
