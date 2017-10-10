import { Component, Input, OnChanges } from '@angular/core';

import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessage } from './chat-message';
@Component({
  selector: 'knx-chat-stream',
  template: `
    <div class="knx-chat-stream" [ngClass]="{'knx-chat-stream--expanded': chatExpanded}">
      <knx-avatar (click)="toggleChat()" (clickOutside)="closeChat()" [title]="options.avatar.title"></knx-avatar>

      <div class="knx-avatar__notification" [ngClass]="{'knx-avatar__notification--active': hasNewMessage}"></div>

      <knx-chat-message *ngFor="let message of messages" [data]="message?.data"></knx-chat-message>

      <!-- slot for filter options -->
      <ng-content select="knx-car-extras"></ng-content>

      <!-- other -->
      <ng-content></ng-content>
    </div>
`
})
export class ChatStreamComponent implements OnChanges {
  @Input() options: ChatStreamOptions;
  @Input() messages: Array<ChatMessage>;
  chatExpanded = false;
  hasNewMessage = true;

  ngOnChanges(changes: any) {
    if (!this.chatExpanded) {
      this.hasNewMessage = true;
    }
  }

  toggleChat() {
    this.chatExpanded = !this.chatExpanded;
    this.hasNewMessage = false;
  }

  closeChat() {
    this.chatExpanded = false;
  }
}
