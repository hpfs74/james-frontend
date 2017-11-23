import { Component, Input, ElementRef, AfterContentInit } from '@angular/core';
import { KNXCheckboxOptions, KNX_CHECKBOX_DEFAULT_OPTIONS } from './checkbox.options';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';
import { clone } from '@cx/utils';

@Component({
  selector: 'knx-checkbox',
  providers: [getCXValueAccessor(KNXCheckboxComponent)],
  styleUrls: ['./checkbox.component.scss'],
  template: `
<div class="cx-form-group__wrap {{(options.formGroupModifiers || []).join(' ')}}"
            [class.knx-checkbox--error]="getErrorList()">
  <label *ngIf="!options.items" class="cx-checkbox" [class.cx-checkbox--disabled]="options.disabled">
    <input [disabled]="options.disabled"  type="checkbox" [(ngModel)]="innerValue" (change)="onChange()"/>
    <span class="cx-checkbox__control"></span>
    <span class="cx-checkbox__label" *ngIf="options.label">{{options.label}}</span>
    <span class="cx-checkbox__label" *ngIf="!options.label">
      <ng-content></ng-content>
    </span>
  </label>

  <div class="knx-checkbox__error_message" *ngIf="getErrorList()">
    <p *ngFor="let error of getErrorList()">{{error}}</p>
  </div>
</div>
`
})
export class KNXCheckboxComponent extends CXFormComponent {
  @Input() options: KNXCheckboxOptions;
  constructor (public elementRef: ElementRef) {
    super(elementRef, KNX_CHECKBOX_DEFAULT_OPTIONS);
  }

  onChange() {
    this.onChangeCallback(clone(this.innerValue));
    this.onTouchedCallback();
  }

  getErrorList() {
    if (this.options.showErrorMessages !== undefined) {
      if (this.options.showErrorMessages) {
        return this.getVisibleErrors();
      }
      return null;
    }
    return this.getVisibleErrors();
  }

  getVisibleErrors() {
    if (this.hasErrors() && this.options.hideErrors) {
      let errorMessages = Object
      .keys(this.options.formControl.errors)
      .filter(error => this.options.hideErrors.indexOf(error) === -1)
      .map(error => this.getErrorMessage(error));
      return errorMessages.length === 0 ? null : errorMessages;
    }
    return this.getErrors();
  }
}
