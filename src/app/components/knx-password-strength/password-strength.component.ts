import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-password-strength',
  styleUrls: ['./password-strength.component.scss'],
  template: `
    <div class="knx-password-strength">
      <span>Minimaal</span>
      <span
        [ngClass]="{
          'knx-password__error': password && !passwordLength(),
          'knx-password__good': password && passwordLength() }">8 karakters</span> -
      <span
        [ngClass]="{
          'knx-password__error': password && !containsAtLeastOneNumber(),
          'knx-password__good': password && containsAtLeastOneNumber() }">1 cijfer</span> -
      <span
        [ngClass]="{
            'knx-password__error': password && !containsAtLeastOneCap(),
            'knx-password__good': password && containsAtLeastOneCap() }">1 hoofletter</span> -
      <span
        [ngClass]="{
            'knx-password__error': password && !containerAtLeastOneLowerCase(),
            'knx-password__good': password && containerAtLeastOneLowerCase() }">1 kleine letter</span>
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
