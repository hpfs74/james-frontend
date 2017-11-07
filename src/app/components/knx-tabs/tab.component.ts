import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-tab',
  template: `
    <div [hidden]="!active" class="knx-tab__content">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('title') title: string;
  @Input() active = false;
}
