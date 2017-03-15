import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-button-icon',
  template: `
  <div class="ki-button-icon">
    <button class="button-circle">
        <span class="button-icon fa fa-lg {{ icon }}"></span>
    </button>
    <span *ngIf="label" class="button-label">{{ label }}</span>
  </div>
  `
})
export class ButtonIconComponent {
  @Input() label: string;
  @Input() icon: string;
}
