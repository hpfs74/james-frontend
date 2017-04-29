import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-loader',
  template: `
    <div class="knx-loader-message" *ngIf="visible">
      <ng-content></ng-content>
    </div>
  `
})
export class LoaderComponent {
  @Input() visible: boolean = false;
}
