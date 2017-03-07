
import { Component, Input, trigger, state, style, transition, animate, OnInit } from '@angular/core';

@Component({
  selector: 'ki-message',
  template: `
  <div class='ki-chat-message'>
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-sm-12'>/
          {{ message }}
          <div class="ki-chat-message-datetime">{{ getMessageDate() | date:'shortTime' }}</div>
        </div>
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
          //transform: 'translateX(-100%)',
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate('0.4s 10 ease-out', style({
          opacity: 0,
          scale: 0,
          //transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  @Input() message: string;
  date: Date;

  getMessageDate() {
    return this.date;
  }

  ngOnInit() {
    this.date = new Date();
  }
}
