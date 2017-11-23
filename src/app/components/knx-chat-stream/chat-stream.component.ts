import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessage } from './chat-message';
@Component({
  selector: 'knx-chat-stream',
  styleUrls: ['./chat-stream.component.scss'],
  template: `
    <div class="knx-chat-stream" [ngClass]="{'knx-chat-stream--expanded': chatExpanded}">
      <knx-avatar
        (click)="toggleChat()"
        (knxClickOutside)="closeChat()"
        [title]="options.avatar.title"
        image="/assets/images/avatars/avatar.png">
      </knx-avatar>

      <div class="knx-chat-stream__notification" [ngClass]="{'knx-chat-stream__notification--active': hasNewMessage}"></div>

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
  @Output() public onChatExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.onChatExpand.emit(this.chatExpanded);
  }

  closeChat() {
    this.chatExpanded = false;
    this.onChatExpand.emit(this.chatExpanded);
  }
}
