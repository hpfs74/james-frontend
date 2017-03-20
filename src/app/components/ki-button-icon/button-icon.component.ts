import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-button-icon',
  template: `
  <div class="ki-button-icon" [class.ki-button-icon--placeholder]="isPlaceholder">
    <button class="button-circle">
        <img class="button-icon" src="/assets/images/icon-car.svg">
        <!-- <ng-content></ng-content> -->
    </button>
    <span *ngIf="label" class="button-label">{{ label }}</span>
  </div>
  `
})
export class ButtonIconComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() isPlaceholder: boolean = false;
}
