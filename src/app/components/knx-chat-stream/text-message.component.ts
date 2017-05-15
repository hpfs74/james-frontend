import { Component, Input, OnInit } from '@angular/core';
import { flyInOutAnimation } from '../../animations/fly-in-out.animation';
import { IChatMessage } from './chat-message.interface';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div class='knx-chat-message' [@flyInOutAnimation]="'in'">
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-md-12 col-sm-12' [innerHTML]="data"></div>
      </div>
    </div>
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
  }
}
