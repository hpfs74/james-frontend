import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-password-strength',
  styleUrls: ['./password-strength.component.scss'],
  template: `
    <div class="knx-password-strength">
      <span>Minimaal</span>
      <span
        [ngClass]="{
          'knx-password__error': !passwordLength(),
          'knx-password__good': passwordLength() }">8 karakters</span> -
      <span
        [ngClass]="{
          'knx-password__error': !containsAtLeastOneNumber(),
          'knx-password__good': containsAtLeastOneNumber() }">1 cijfer</span> -
      <span
        [ngClass]="{
            'knx-password__error': !containsAtLeastOneCap(),
            'knx-password__good': containsAtLeastOneCap() }">1 hoofletter</span> -
      <span
        [ngClass]="{
            'knx-password__error': !containerAtLeastOneLowerCase(),
            'knx-password__good': containerAtLeastOneLowerCase() }">1 kleine letter</span>
    </div>
  `
})
export class PasswordStrengthComponent  {
  @Input() password: string;

  passwordLength(): boolean {
    if (this.password) {
      return this.password.length >= 8;
    }
    return false;
  }

  containsAtLeastOneNumber(): boolean {
    if (this.password) {
      return /[0-9]/.test(this.password);
    }
    return false;
  }

  containsAtLeastOneCap(): boolean {
    if (this.password) {
      return /[A-Z]/.test(this.password);
    }
    return false;
  }

  containerAtLeastOneLowerCase(): boolean {
    if (this.password) {
      return /[a-z]/.test(this.password);
    }
    return false;
  }
}
