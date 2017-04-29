import { Component, Input, OnInit } from '@angular/core';

import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessage } from '../../models/chat-message';

//@TODO: REFACTOR: message type based on a string to determine if it's a regular textual message or a vehicle info object
@Component({
  selector: 'knx-chat-stream',
  template: `
    <div class="knx-chat-stream">
      <knx-avatar *ngIf="options.showAvatar" [name]="options.avatarName" [title]="options.avatarTitle"></knx-avatar>
      <ng-container *ngFor="let msg of messages">
        <knx-chat-message *ngIf="msg.type === 'car'">
          <knx-car-info [car]="msg.content"></knx-car-info>
        </knx-chat-message>
        <knx-chat-message *ngIf="msg.type === 'text'" [message]="msg.content"></knx-chat-message>
      </ng-container>
    </div>
`
})
export class ChatStreamComponent {
  @Input() options: ChatStreamOptions;
  @Input() messages: ChatMessage[];
}
