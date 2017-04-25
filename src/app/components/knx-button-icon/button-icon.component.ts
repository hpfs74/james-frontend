import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-button-icon',
  template: `
   <div class="knx-button-icon" [class.knx-button-icon--placeholder]="isPlaceholder">
    <button class="knx-button-icon__circle">
        <ng-content></ng-content>
        <!-- <ng-content><knx-icon></knx-icon></ng-content> -->
    </button>
    <span *ngIf="label" class="knx-button-icon__label">{{ label }}</span>
  </div>
  `
})
export class ButtonIconComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() isPlaceholder: boolean = false;
}
