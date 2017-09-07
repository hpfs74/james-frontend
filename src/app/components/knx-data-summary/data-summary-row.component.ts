import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-data-summary-row',
  template: `
    <div class="row">
      <div class="col col-md-5">
        {{label}}<span *ngIf="showInfo">
          <knx-info size="md" isFloating="true" class="knx-info">
            <div class="knx-info__content">
              <div class="knx-message knx-message--arrow-top">
                <div class="knx-message__content" [innerHTML]="infoText"></div>
              </div>
            </div>
          </knx-info>
        </span>
      </div>
      <div class="col col-md-5">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class DataSummaryRowComponent {
  @Input() showInfo = false;
  @Input() label: string;
  @Input() infoText: string;
}
