import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { slideInOutAnimation } from '../../animations/slide-in-out.animation';

@Component({
  selector: 'knx-side-panel',
  template: `
    <div class="knx-side-panel"
         (@slideInOutAnimation.done)="onAnimationEnd()"
         [@slideInOutAnimation]="animationState"
         [class.knx-side-panel--fullwidth]="fullwidth">
      <div class="knx-side-panel__toolbar">{{ title }}
        <button *ngIf="showCloseButton && (show || animationInProgress)"
                class="knx-button knx-button--link knx-icon-close"
                (click)="close()">
        </button>
      </div>

      <div class="knx-side-panel__content" *ngIf="show || animationInProgress">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [slideInOutAnimation]
})
export class SidePanelComponent implements OnInit {
  @Input() title: string;
  @Input() fullwidth = false;
  @Input() showCloseButton = true;

  show: boolean;
  animationState: string;
  animationInProgress = false;

  ngOnInit() {
    this.show = false;
    this.animationState = 'out';
  }

  public open(): void {
    this.animationInProgress = true;
    this.show = true;
    this.animationState = 'in';
  }

  public close(): void {
    this.animationInProgress = true;
    this.show = false;
    this.animationState = 'out';
  }

  onAnimationEnd() {
    // hide the side panel links if they are not visible for keyboard accessibility
    this.animationInProgress = false;
  }
}
