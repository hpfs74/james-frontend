import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IChatMessage } from './chat-message.interface';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div class='knx-chat-message' [@flyInOut]="'in'">
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-md-12 col-sm-12' [innerHTML]="data"></div>
      </div>
    </div>
  </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, scale: 0 })),
      transition('void => *', [
        style({
          opacity: 0,
          scale: 1,
          transform: 'translateY(100%)',
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          scale: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ]
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
