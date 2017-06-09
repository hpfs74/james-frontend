import { Component, Input, OnInit } from '@angular/core';
import { flyInOutAnimation } from '../../animations/fly-in-out.animation';
import { IChatMessage } from './chat-message.interface';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div *ngFor="let message of data" class='knx-message knx-message--chat' [@flyInOutAnimation]="'in'">
    <div class="knx-message__content" [innerHTML]="message"></div>
  </div>
  `,
  animations: [ flyInOutAnimation ]
})
export class TextMessageComponent implements OnInit, IChatMessage {
  @Input() data: any;
  @Input() showDate: boolean = false;

  date: Date;

  getMessageDate() {
    return this.date;
  }

  ngOnInit() {
    this.date = new Date();

    if(!(this.data instanceof Array)) {
      this.data = [this.data];
    }
  }
}
