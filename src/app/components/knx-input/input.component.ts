import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { KNXInputOptions, KNX_INPUT_DEFAULT_OPTIONS } from './input.options';
import { CXFormComponent, getCXValueAccessor } from '@cx/form-control';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'knx-input',
  providers: [getCXValueAccessor(KNXInputComponent)],
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html'
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
