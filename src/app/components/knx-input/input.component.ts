import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { KNXInputOptions, KNX_INPUT_DEFAULT_OPTIONS } from './input.options';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';

@Component({
  selector: 'knx-input',
  providers: [getCXValueAccessor(KNXInputComponent)],
  styleUrls: ['./input.component.scss'],
  template: `
<div class="knx-input" [class.knx-input--error]="getErrors()">
    <div class="knx-input__error_message" *ngIf="getErrors()">
        <p *ngFor="let error of getErrors()">{{error}}</p>
    </div>

    <input #inputControl
        *ngIf="!options.textMask"
           (blur)="onTouchedCallback()"
           [(ngModel)]="value"
           [placeholder]="options.placeholder"
           [class.knx-input__input--disabled]="options.disabled"
           [disabled]="options.disabled"
           [type]="options.type"
           [ngClass]="{'knx-input__input': true, 'knx-input__addon-left': hasAddonLeft() }">

    <input class="knx-input__input" #inputControl
            *ngIf="options.textMask"
           (blur)="onTouchedCallback()"
           [(ngModel)]="value"
           [placeholder]="options.placeholder"
           [class.knx-input__input--disabled]="options.disabled"
           [disabled]="options.disabled"
           [type]="options.type"
           [textMask]="options.textMask"
           [ngClass]="{'knx-input__input': true, 'knx-input__addon-left': hasAddonLeft() }">

    <span *ngIf="hasAddonLeft()" [ngClass]="['knx-input__addon-icon', getAddonIcon()]"></span>
</div>
`
})
export class KNXInputComponent extends CXFormComponent implements OnInit {

  @Input() options: KNXInputOptions;


  constructor(public elementRef: ElementRef) {
    super(elementRef, KNX_INPUT_DEFAULT_OPTIONS);
  }

  ngOnInit() {

  }

  hasAddonLeft(): boolean {
    if (this.options.attributes && this.options.attributes['addonleft']) {
      return true;
    }

    return false;
  }

  getAddonIcon(): string {
    if (this.options.attributes && this.options.attributes['addonicon']) {
      return this.options.attributes['addonicon'];
    }
    return '';
  }
}
