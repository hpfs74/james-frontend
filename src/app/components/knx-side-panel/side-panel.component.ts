import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

@Component({
  selector: 'knx-side-panel',
  template: `
    <div class="knx-side-panel" [@slideInOutAnimation]="isVisible">
      <div class="knx-side-panel__toolbar">{{ title }}
        <button *ngIf="showCloseButton" class="knx-button knx-button--link knx-icon-close" (click)="close()"></button></div>
      <div class="knx-side-panel__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [slideInOutAnimation]
})
export class SidePanelComponent {
  @Input() title: string;
  @Input() showCloseButton: boolean = true;

  isVisible: string;

  open(): void {
    this.isVisible = 'in';
  }

  close(): void {
    this.isVisible = 'out';
  }
}
