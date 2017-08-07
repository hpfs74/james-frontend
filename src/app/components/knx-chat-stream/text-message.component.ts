import { Component, Input, OnInit } from '@angular/core';
import { flyInOutAnimation } from '../../animations/fly-in-out.animation';
import { IChatMessage } from './chat-message.interface';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div class='knx-message knx-message--chat' [@flyInOutAnimation]="'in'">
    <div class="knx-message__content" [innerHTML]="data"></div>
  </div>
  `,
  animations: [ flyInOutAnimation ]
})
export class TextMessageComponent implements OnInit, IChatMessage {
  @Input() data: any;
  @Input() showDate = false;

  date: Date;

  getMessageDate() {
    return this.date;
  }

  ngOnInit() {
    this.date = new Date();
  }
}
