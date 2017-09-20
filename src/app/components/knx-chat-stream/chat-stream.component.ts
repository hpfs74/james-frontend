import { Observable } from 'rxjs/Observable';
import {
  Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, AfterViewInit,
  OnDestroy, ComponentFactoryResolver
} from '@angular/core';

import { AvatarComponent } from './../knx-avatar/avatar.component';
import { ChatMessageDirective } from './chat-message.directive';
import { ChatStreamOptions } from './chat-stream.options';
import { TextMessageComponent } from './text-message.component';
import { IChatMessage } from './chat-message.interface';
import { ChatMessage } from './chat-message';

@Component({
  selector: 'knx-chat-stream',
  template: `
    <div class="knx-chat-stream">
      <knx-avatar [name]="options.avatar.name" [title]="options.avatar.title"></knx-avatar>

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
