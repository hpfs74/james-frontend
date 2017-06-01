import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

@Component({
  selector: 'knx-side-panel',
  template: `
    <div class="knx-side-panel" [@slideInOutAnimation]="animationState">
      <div class="knx-side-panel__toolbar">{{ title }}
        <button *ngIf="showCloseButton" class="knx-button knx-button--link knx-icon-close" (click)="close()"></button></div>
      <div class="knx-side-panel__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [slideInOutAnimation]
})
export class SidePanelComponent implements OnInit {
  @Input() title: string;
  @Input() showCloseButton: boolean = true;

  show: boolean;
  animationState: string;

  ngOnInit() {
    this.show = false;
    this.animationState = 'out';
  }

  public open(): void {
    this.show = true;
    this.animationState = 'in';
  }

  public close(): void {
    this.show = false;
    this.animationState = 'out';
  }
}
