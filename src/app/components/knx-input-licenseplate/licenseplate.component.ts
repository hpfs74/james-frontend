import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { FormControlOptions } from '@knx/form-control';
import { KNXFormComponent, getKNXValueAccessor } from '@knx/form-control';
import { KNXInputOptions } from '@knx/input';

import { LICENSE_PLATE_DEFAULT_OPTIONS } from './licenseplate.options';
import { licensePlateMask } from './licenseplate.mask';

@Component({
  selector: 'knx-input-licenseplate',
  providers: [getKNXValueAccessor(LicensePlateComponent)],
  styleUrls: ['./licenseplate.component.scss'],
  template: `
    <div class="knx-input knx-input--licenseplate" [class.knx-input--error]="getErrors()">
      <div class="knx-input__error_message" *ngIf="getErrors()">
        <p *ngFor="let error of getErrors()">{{error}}</p>
      </div>

      <input class="knx-input__input"
        (blur)="onTouchedCallback()"
        [(ngModel)]="value"
        [placeholder]="options.placeholder"
        [class.knx-input__input--disabled]="options.disabled"
        [disabled]="options.disabled"
        [type]="'text'"
        [textMask]="textMask">
    </div>
`
})
export class LicensePlateComponent extends KNXFormComponent implements OnInit {
  @Input() options: KNXInputOptions;

  textMask: any = licensePlateMask;

  constructor(public elementRef: ElementRef) {
    super(elementRef, LICENSE_PLATE_DEFAULT_OPTIONS);
  }

  ngOnInit() {
    this.options.transform = this.textMask.decode;
  }
}

