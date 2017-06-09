import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { FormControlOptions } from '@cx/form-control';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';
import { CXInputOptions } from '@cx/input';

import { LicensePlateOptions, LICENSE_PLATE_DEFAULT_OPTIONS } from './licenseplate.options';
import { licensePlateMask } from './licenseplate.mask';

@Component({
  selector: 'knx-input-licenseplate',
  providers: [getCXValueAccessor(LicensePlateComponent)],
  template: `
    <div class="cx-input knx-input--licenseplate" [class.cx-input--error]="getErrors()">
      <div class="cx-input__error_message" *ngIf="getErrors()">
          <p *ngFor="let error of getErrors()">{{error}}</p>
      </div>

      <input class="cx-input__input"
            (blur)="onTouchedCallback()"
            [(ngModel)]="value"
            [placeholder]="options.placeholder"
            [class.cx-input__input--disabled]="options.disabled"
            [disabled]="options.disabled"
            [type]="'text'"
            [textMask]="textMask">
    </div>
`
})
export class LicensePlateComponent extends CXFormComponent implements OnInit {
  @Input() options: LicensePlateOptions;

  textMask: any = licensePlateMask;

  constructor(public elementRef: ElementRef) {
    super(elementRef, LICENSE_PLATE_DEFAULT_OPTIONS);
  }

  ngOnInit() {
    this.options.transform = this.textMask.decode;
  }
}

