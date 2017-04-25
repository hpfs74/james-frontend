import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-spinner',
  template: `
    <div class="knx-loader-icon" *ngIf="visible">
      <div class="knx-loader-cut">
        <div class="knx-loader-donut"></div>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  @Input() visible: boolean = false;
}
