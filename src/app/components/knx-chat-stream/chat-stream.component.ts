import { Component, Input } from '@angular/core';

import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessage } from './chat-message';

@Component({
  selector: 'knx-chat-stream',
  template: `
    <div class="knx-chat-stream">
      <knx-avatar [title]="options.avatar.title"></knx-avatar>

      <knx-chat-message *ngFor="let message of messages" [data]="message?.data"></knx-chat-message>

      <!-- slot for filter options -->
      <ng-content select="knx-car-extras"></ng-content>

      <!-- other -->
      <ng-content></ng-content>
    </div>
`
})
export class ChatStreamComponent {
  @Input() options: ChatStreamOptions;
  @Input() messages: Array<ChatMessage>;
}
