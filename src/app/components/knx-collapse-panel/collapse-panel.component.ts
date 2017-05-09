import { Component, Input, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'knx-collapse-panel',
  template: `
    <div class="knx-collapse-panel">
      <a role="button" class="knx-button knx-button--link"
        (click)="toggle()" [class.knx-button--panel-open]="showPanel">{{ showPanel ? closeLabel : openLabel }}</a>

      <div class="row knx-collapse-panel__content" [@togglePanel]="showPanel" [attr.height]="contentHeight">
        <div class="col-sm-12">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('togglePanel', [
      state('true', style({ height: '*', display: 'block' })),
      state('false', style({ height: '0px', display: 'none' })),
      transition('1 => 0', animate('100ms ease-out')),
      transition('0 => 1', animate('100ms ease-in'))
    ])
  ]
})
export class CollapsePanelComponent  {
  @Input() openLabel: string;
  @Input() closeLabel: string;
  @Input() contentHeight: string;

  showPanel: boolean = false;

  toggle() {
    this.showPanel = !this.showPanel;
  }
}
