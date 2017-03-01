
import { Component, Input, trigger, state, style, transition, animate, OnInit } from '@angular/core';

@Component({
  selector: 'ki-message',
  styleUrls: ['./message.component.scss'],
  template: `
  <div class='ki-block-round'>
    <div class='cx-container-fluid'>
      <div class='cx-row'>
        <div class='cx-col-sm-12'>/
          {{ message }}
          <small>{{ getMessageDate() }}</small>
        </div>          
      </div>
    </div>
  </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate('0.4s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
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
