import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { KNXInputOptions, KNX_INPUT_DEFAULT_OPTIONS } from './input.options';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'knx-input',
  providers: [getCXValueAccessor(KNXInputComponent)],
  styleUrls: ['./input.component.scss'],
  template: `
<div class="knx-input" [class.knx-input--error]="getVisibleErrors()" [class.knx-input--valid]="(isValid$ | async)">
    <label *ngIf="options.label">{{ options.label }}</label>
    <div class="knx-input__wrapper">
      <span *ngIf="hasAddonLeft()" [ngClass]="['knx-input__addon-icon', getAddonIcon()]"></span>
      <span *ngIf="(isValid$ | async) && options.attributes['data-type'] != 'password'"
        [ngClass]="['knx-input__valid', 'knx-icon-check']">
      </span>

      <input class="knx-input__input" #inputControl
        *ngIf="!options.textMask"
          (blur)="onTouchedCallback()"
          [(ngModel)]="value"
          [placeholder]="options.placeholder"
          [disabled]="options.disabled"
          [type]="options.type"
          [ngClass]="{
            'knx-input__addon-left': hasAddonLeft(),
            'knx-input__input--disabled': options.disabled
          }">

      <input class="knx-input__input" #inputControl
        *ngIf="options.textMask"
        (blur)="onTouchedCallback()"
        [(ngModel)]="value"
        [placeholder]="options.placeholder"
        [disabled]="options.disabled"
        [type]="options.type"
        [textMask]="options.textMask"
        [ngClass]="{
          'knx-input__addon-left': hasAddonLeft(),
          'knx-input__input--disabled': options.disabled
        }">

      <button type="button"
        *ngIf="options.attributes['data-type'] != undefined && options.attributes['data-type'] == 'password' && options.formControl.value"
        class="knx-input__show-password knx-icon-eye"
        [class.knx-icon-eye-slash]="showPassword"
        [class.knx-icon-eye]="!showPassword"
        (click)="toggleShowPassword($event)">
      </button>

      <div class="knx-input__error_message" *ngIf="getVisibleErrors()">
        <p *ngFor="let error of getErrors()">{{error}}</p>
      </div>
    </div>
</div>
`
})
export class KNXInputComponent extends CXFormComponent implements OnInit {
  @Input() options: KNXInputOptions;

  showPassword = false;
  isValid$: Observable<boolean>;

  constructor(public elementRef: ElementRef) {
    super(elementRef, KNX_INPUT_DEFAULT_OPTIONS);
  }

  ngOnInit() {
    const input = this.options.formControl;
    this.isValid$ = input.statusChanges.map(() => {
      return input.touched && input.valid;
    });
  }

  hasAddonLeft(): boolean {
    if (this.options.attributes && this.options.attributes['addonleft']) {
      return true;
    }
    return false;
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

  getAddonIcon(): string {
    if (this.options.attributes && this.options.attributes['addonicon']) {
      return this.options.attributes['addonicon'];
    }
    return '';
  }

  toggleShowPassword(event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
    this.options.type =
      (this.options.type === 'password')
        ? 'text' : 'password';
  }
}
