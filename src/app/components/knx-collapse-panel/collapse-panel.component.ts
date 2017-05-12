import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'knx-collapse-panel',
  template: `
    <div class="knx-collapse-panel">
      <a role="button" class="knx-button knx-button--link"
        (click)="toggle()" [class.knx-button--panel-open]="showPanel">{{ showPanel ? closeLabel : openLabel }}</a>

      <div class="row knx-collapse-panel__content" *ngIf="showPanel" [@togglePanel]="showPanel" [attr.height]="contentHeight">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('togglePanel', [
      state('in', style({ display: 'block', opacity: 1, height: '*' })),
      transition('void => *', [
        style({ display: 'block', opacity: 1, height: '*' }),
        animate('200ms ease-in')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({ display: 'none', opactiy: 0, height: '0px' }))
      ])
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
