import { Component, Input, OnInit } from '@angular/core';
import { flyInOutAnimation } from '../../shared/animations/fly-in-out.animation';
import { IChatMessage } from './chat-message.interface';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div class="knx-message knx-message--chat knx-message--arrow-top-center" [@flyInOutAnimation]="'in'">
    <div class="knx-message__content" [innerHTML]="data"></div>
  </div>
  `,
  animations: [ flyInOutAnimation ]
})
export class TextMessageComponent implements OnInit, IChatMessage {
  @Input() data: any;

  date: Date;

  getMessageDate() {
    return this.date;
  }

  ngOnInit() {
    this.date = new Date();
  }
}
