import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-car-preview',
  template: `
    <div class="knx-car-preview__car knx-car--{{colorCode}}">
      <!-- // TODO: -->
    </div>`
})

export class CarPreviewComponent {
  @Input() colorCode: string;
}
