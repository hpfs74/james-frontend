import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'knx-password-strength',
  template: `
    <div class="knx-password-strength">
      <span>Minimaal</span>
      <span ngClass="{ 'knx-password-error': passwordLength() }">8 karakters</span> -
      <span ngClass="{ 'knx-password-error': containsAtLeastOneNumber() }">1 cijfer</span> -
      <span ngClass="{ 'knx-password-error': containsAtLeastOneCap()">1 hoofletter</span> -
      <span ngClass="{ 'knx-password-error': containerAtLeastOneLowerCase() }">1 kleine letter</span>
    </div>
  `
})
export class PasswordStrengthComponent implements OnInit {
  @Input() password: string;

  ngOnInit() {
  }

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
