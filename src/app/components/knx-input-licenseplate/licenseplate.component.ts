import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { Options, DEFAULT_OPTIONS } from '../../../../node_modules/@cx/input/src/cx-input.options';
import { CXFormComponent, getCXValueAccessor } from '../../../../node_modules/@cx/form';
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
              [type]="options.type"
              [textMask]="textMask">
    </div>
`
})
export class LicensePlateComponent extends CXFormComponent implements OnInit {
  @Input() options: Options;

  public textMask: any = licensePlateMask;

  ngOnInit(): void {
    this.options.transform = this.textMask.decode;
  }

  constructor(public elementRef: ElementRef) {
    super(elementRef, DEFAULT_OPTIONS);
  }
}

