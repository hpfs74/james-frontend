import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-password-strength',
  template: `
    <div class="knx-password-strength">
      <span>Minimaal</span>
      <span
        [ngClass]="{
          'knx-password-error': password && !passwordLength(),
          'knx-password-good': password && passwordLength() }">8 karakters</span> -
      <span
        [ngClass]="{
          'knx-password-error': password && !containsAtLeastOneNumber(),
          'knx-password-good': password && containsAtLeastOneNumber() }">1 cijfer</span> -
      <span
        [ngClass]="{
            'knx-password-error': password && !containsAtLeastOneCap(),
            'knx-password-good': password && containsAtLeastOneCap() }">1 hoofletter</span> -
      <span
        [ngClass]="{
            'knx-password-error': password && !containerAtLeastOneLowerCase(),
            'knx-password-good': password && containerAtLeastOneLowerCase() }">1 kleine letter</span>
    </div>
  `
})
export class PasswordStrengthComponent  {
  @Input() password: string;

  passwordLength(): boolean {
    return this.password.length >= 8;
  }

  containsAtLeastOneNumber(): boolean {
    return /[0-9]/.test(this.password);
  }

  containsAtLeastOneCap(): boolean {
    return /[A-Z]/.test(this.password);
  }

  containerAtLeastOneLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }
}
