import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../models';
import { CarInsurance } from '../../models/car-insurance';
import { SectionItem } from './insurance-summary-section';

@Component({
  selector: 'knx-insurance-summary',
  template: `
    <knx-collapsible-panel *ngFor="let section of sections" title="{{section.label}}">
      <div *ngFor="let subsection of section.groups" class="knx-collapsible-panel__content">
        <div class="row" *ngFor="let sectionField of subsection.fields">
          <div class="col col-md-5">
            {{sectionField.label}}<span *ngIf="sectionField.info">
              <knx-info size="md" isFloating="true" class="knx-info">
                <div class="knx-info__content">
                  <div class="knx-message knx-message--chat knx-message--arrow-top">
                    <div class="knx-message__content" [innerHTML]="sectionField.info"></div>
                  </div>
                </div>
              </knx-info>
            </span>
          </div>
          <div class="col col-md-5">
            {{sectionField.value}}
          </div>
        </div>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceSummaryComponent {
  @Input() sections: Array<SectionItem>;
}

