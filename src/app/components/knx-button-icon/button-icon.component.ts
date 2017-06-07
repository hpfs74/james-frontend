import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-button-icon',
  template: `
   <div class="knx-button-icon" [class.knx-button-icon--placeholder]="isPlaceholder">
    <button class="knx-button-icon__circle" [ngClass]="{ 'knx-button-icon__circle-success': success }">
        <ng-content></ng-content>
        <div *ngIf="isPlaceholder" class="knx-button-icon__action"><span class="knx-icon-plus"></span></div>
    </button>
    <span *ngIf="label" class="knx-button-icon__label">{{ label }}</span>
  </div>
  `
})
export class ButtonIconComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() isPlaceholder: boolean = false;
  @Input() success: boolean = false;
}
