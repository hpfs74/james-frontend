import { Component, Input, trigger, state, style, transition, animate, OnInit } from '@angular/core';

@Component({
  selector: 'knx-chat-message',
  template: `
  <div class='knx-chat-message' [@flyInOut]="'in'">
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-md-12 col-sm-12'>
          <div #ref><ng-content></ng-content></div>
          <ng-container *ngIf="ref.childNodes.length == 0">
            {{ message }}
          </ng-container>
          <div class="knx-chat-message-datetime">{{ getMessageDate() | date:'shortTime' }}</div>
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
          transform: 'translateX(-100%)',
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          scale: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ChatMessageComponent implements OnInit {
  @Input() message: string;
  date: Date;

  getMessageDate() {
    return this.date;
  }

  ngOnInit() {
    this.date = new Date();
  }
}
