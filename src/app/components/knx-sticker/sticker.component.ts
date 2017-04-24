import { Component } from '@angular/core';

@Component({
  selector: 'knx-sticker',
  template: `
    <div class="sticker">
      <div class="sticker-text"><ng-content></ng-content></div>
    </div>
  `
})
export class StickerComponent {
}
