import { Component, Input, OnInit } from '@angular/core';

import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessage } from './chat-message';

//@TODO: REFACTOR: message type based on a string to determine if it's a regular textual message or a vehicle info object
@Component({
  selector: 'ki-chat-stream',
  template: `
    <div class="ki-chat-stream">
      <ki-avatar *ngIf="options.showAvatar" [name]="options.avatarName" [title]="options.avatarTitle"></ki-avatar>
      <ng-container *ngFor="let msg of messages">
        <ki-chat-message *ngIf="msg.type === 'vehicle'">
          <ki-vehicle-info [vehicle]="msg.content"></ki-vehicle-info>
        </ki-chat-message>

        <ki-chat-message *ngIf="msg.type === 'text'" [message]="msg.content"></ki-chat-message>
      </ng-container>
    </div>
`
})
export class ChatStreamComponent {
  @Input() options: ChatStreamOptions;
  @Input() messages: ChatMessage[];
}
