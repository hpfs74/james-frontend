import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { ChatMessageDirective } from './chat-message.directive';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatMessage } from './chat-message';

// Types of messages
import { TextMessageComponent } from './text-message.component';

const exportableDeclarations = [
  ChatMessageDirective,
  ChatStreamComponent,
  TextMessageComponent,
];

@NgModule({
  imports: [ CommonModule, SharedModule ],
  exports: exportableDeclarations,
  declarations: exportableDeclarations,
  entryComponents: [ TextMessageComponent ]
})
export class ChatStreamModule { }

