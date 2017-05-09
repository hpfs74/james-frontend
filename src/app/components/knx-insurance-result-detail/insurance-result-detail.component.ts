import { Component, OnInit, Input } from '@angular/core';
import { Insurance } from './../../models/insurance';

@Component({
  selector: 'knx-insurance-result-detail',
  template: `
    <knx-collapse-panel
      class="knx-insurance-result__details"
      [contentHeight]="'200px'"
      [openLabel]="'bekijk details'"
      [closeLabel]="'sluit details'">
        <h3>Hello</h3>
    </knx-collapse-panel>
  `
})
export class InsuranceResultDetailComponent {
  @Input() insurance: Insurance;
}
