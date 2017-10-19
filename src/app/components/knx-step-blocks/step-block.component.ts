import { Component } from '@angular/core';

@Component({
  selector: 'knx-step-block',
  styleUrls: ['./step-block.component.scss'],
  template: `
    <div class="knx-step-block">
      <ng-content></ng-content>
    </div>
  `
})
export class StepBlockComponent {}
