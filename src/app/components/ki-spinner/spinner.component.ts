import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-spinner',
  template: `
    <div class="spinner-icon" *ngIf="visible">
      <div class="spinner-cut">
        <div class="spinner-donut"></div>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  @Input() visible: boolean = false;
}
