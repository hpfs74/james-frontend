import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="knx-tab__content">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
}
