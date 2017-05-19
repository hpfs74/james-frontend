import { Component, Input } from '@angular/core';
import { collapseAnimation } from '../../animations/collapse.animation';

@Component({
  selector: 'knx-collapse-panel',
  template: `
    <div class="knx-collapse-panel">
      <a role="button" class="knx-button knx-button--link"
        (click)="toggle()" [class.knx-button--panel-open]="isOpen">{{ isOpen ? closeLabel : openLabel }}</a>

      <div class="row knx-collapse-panel__content" *ngIf="isOpen" [@collapseInOutAnimation]="isOpen" [attr.height]="contentHeight">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [ collapseAnimation ]
})
export class CollapsePanelComponent  {
  @Input() openLabel: string;
  @Input() closeLabel: string;
  @Input() contentHeight: string;
  @Input() isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
