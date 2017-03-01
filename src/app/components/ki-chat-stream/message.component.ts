
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-message',
  styleUrls: ['./message.component.scss'],
  template: `
  <div class='ki-block-round'>
    <div class='cx-container-fluid'>
      <div class='cx-row'>
        <div class='cx-col-sm-12'>
          {{ message }}
        </div>          
      </div>
    </div>
  </div>
  `
})
export class MessageComponent {
  @Input() message: string;
}
