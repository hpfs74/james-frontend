import { Component, Input } from '@angular/core';

import { SectionItem, SectionGroup, SectionFields } from './data-summary';

@Component({
  selector: 'knx-data-summary',
  template: `
    <knx-collapsible-panel *ngFor="let section of sections" [title]="section.label">
      <knx-data-summary-group *ngFor="let group of section.groups">
        <knx-data-summary-row *ngFor="let row of group.fields" [label]="row.label">{{ row.value }}</knx-data-summary-row>
      </knx-data-summary-group>
    </knx-collapsible-panel>
  `
})
export class DataSummaryComponent {
  @Input() sections: Array<SectionItem>;
}

