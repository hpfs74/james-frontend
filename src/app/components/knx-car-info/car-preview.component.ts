import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-car-preview',
  template: `<svg-icon class="knx-car-preview__car knx-car--{{colorCode}}" src="/assets/images/cars/sedan.svg"></svg-icon>`
})
export class CarPreviewComponent {
  @Input() colorCode: string;
}
