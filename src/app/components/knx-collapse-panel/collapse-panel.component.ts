import { Component, Input, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'knx-collapse-panel',
  template: `
    <div class="knx-collapse-panel">
      <a role="button" class="knx-button knx-button--link"
        (click)="toggle()" [class.knx-button--panel-open]="showPanel">{{ showPanel ? closeLabel : openLabel }}</a>

      <div class="row knx-collapse-panel__content" [@togglePanel]="showPanel" [attr.height]="contentHeight">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('togglePanel', [
      state('true', style({ display: 'block', opacity: 1, height: '*' })),
      state('false', style({ display: 'none', opactiy: 0, height: '0px' })),
      transition('1 => 0', animate('200ms ease-out')),
      transition('0 => 1', animate('200ms ease-in'))
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
