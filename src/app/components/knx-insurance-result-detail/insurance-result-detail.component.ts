import { Component, OnInit, Input } from '@angular/core';
import { Insurance } from './../../models/insurance';

@Component({
  selector: 'knx-insurance-result-detail',
  template: `
    <knx-collapse-panel
      class="knx-insurance-result__details"
      contentHeight="200px"
      openLabel="bekijk details"
      closeLabel="sluit details">
      <div class="col-md-12 pt-0">
        <knx-tabs>
          <knx-tab tabTitle="Kenmerken">Tab 1 Content</knx-tab>
          <knx-tab tabTitle="Details">Tab 2 Content</knx-tab>
          <knx-tab tabTitle="Reviews">Tab 2 Content</knx-tab>
        </knx-tabs>
      </div>
    </knx-collapse-panel>
  `
})
export class InsuranceResultDetailComponent {
  @Input() insurance: Insurance;
  @Input() showDetails: boolean;
}
