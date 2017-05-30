import { Component, Input } from '@angular/core';
import { collapseInOutAnimation } from '../../animations/collapse.animation';

@Component({
  selector: 'knx-collapse-message',
  template: `
    <div class="knx-collapse-message knx-message"
      [class.knx-collapse-message--open]="isOpen"
      (click)="toggle($event)" role="button">
      <h4 class="knx-collapse-message__title">{{ title }}</h4>
      <a role="button" class="knx-collapse-message__toggle"></a>
      <div class="knx-collapse-message__content" [@collapseInOutAnimation]="isOpen">
        <ng-content *ngIf="isOpen"></ng-content>
      </div>
    </div>`,
  animations: [collapseInOutAnimation]
})
export class CollapseMessageComponent {
  @Input() title: string;
  @Input() isOpen: boolean = false;

  toggle(event) {
    if (event.target.className.indexOf('knx-collapse-message') > -1 || event.target.className === 'knx-collapse-message__title') {
      this.isOpen = !this.isOpen;
    }
  }
}
