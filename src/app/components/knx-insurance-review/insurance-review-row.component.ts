import { Component, Input, OnInit } from '@angular/core';

/*
<knx-ir-content title="Example">
  <knx-ir-row showTooltip="true" showValue="true">
    <knx-ir-label>Test</knx-ir-label>

    <knx-ir-tooltip>
      Lorem ipsum ...
    </knx-ir-tooltip>

    <knx-ir-value>This is a value</knx-ir-value>
  </knx-ir-row>
</knx-ir-content>
*/

@Component({
  selector: 'knx-ir-content',
  template: `
    <knx-collapsible-panel [title]="title">
      <div class="knx-collapsible-panel__content">
        <ng-content select="knx-ir-row"></ng-content>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceReviewRowContentComponent {
  @Input() title: string;
}

@Component({
  selector: 'knx-ir-row',
  template: `
    <hr class="knx-ir-row__divider" *ngIf="newSection">
    <div class="row">
      <div class="col" [ngClass]="{'col-md-5': showValue, 'col-md-12': !showValue}">
        <ng-content select="knx-ir-label"></ng-content>
        <ng-content *ngIf="showTooltip" select="knx-ir-tooltip"></ng-content>
      </div>
      <div *ngIf="showValue" class="col col-md-5">
        <ng-content select="knx-ir-value"></ng-content>
      </div>
    </div>
  `
})
export class InsuranceReviewRowComponent {
  @Input() showTooltip = false;
  @Input() showValue = true;

  // adds divider between rows
  @Input() newSection = false;
}

@Component({
  selector: 'knx-ir-label',
  template: `<ng-content></ng-content>`
})
export class InsuranceReviewRowLabelComponent { }

@Component({
  selector: 'knx-ir-value',
  template: `<ng-content></ng-content>`
})
export class InsuranceReviewRowValueComponent { }

@Component({
  selector: 'knx-ir-tooltip',
  template: `
    <knx-info size="md" isFloating="true" class="knx-info">
    <div class="knx-info__content">
      <div class="knx-message knx-message--arrow-top">
        <div class="knx-message__content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </knx-info>
  `
})
export class InsuranceReviewRowInfoComponent { }
