import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { KNXInputOptions, KNX_INPUT_DEFAULT_OPTIONS } from './input.options';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'knx-input',
  providers: [getCXValueAccessor(KNXInputComponent)],
  styleUrls: ['./input.component.scss'],
  template: `
<div class="knx-input" [class.knx-input--error]="getErrors()" [class.knx-input--valid]="(isValid$ | async)">
    <label *ngIf="options.label">{{ options.label }}</label>
    <div class="input-elements">
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
        <span *ngIf="(isValid$ | async) && options.attributes['data-type'] != 'password'"
          [ngClass]="['knx-input__valid', 'knx-icon-check']">
        </span>

        <button type="button"
          *ngIf="options.attributes['data-type'] != undefined && options.attributes['data-type'] == 'password'"
          class="knx-input__show-password knx-icon-eye"
          [class.knx-icon-eye-slash]="showPassword"
          [class.knx-icon-eye]="!showPassword"
          (click)="toggleShowPassword($event)">
        </button>

        <div class="knx-input__error_message" *ngIf="getErrors() && !options.hideErrors">
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
