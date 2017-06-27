import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AvatarComponent } from '../knx-avatar/avatar.component';
import { ChatMessageDirective } from './chat-message.directive';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatMessage } from './chat-message';

// Types of messages
import { TextMessageComponent } from './text-message.component';
import { CarInfoMessageComponent } from '../knx-car-info-message/car-info-message.component';
import { CarPreviewComponent } from '../knx-car-info-message';

const exportableDeclarations = [
  AvatarComponent,
  ChatMessageDirective,
  ChatStreamComponent,
  TextMessageComponent,
  CarInfoMessageComponent,
  CarPreviewComponent,
];

@NgModule({
  imports: [ CommonModule, SharedModule ],
  exports: exportableDeclarations,
  declarations: exportableDeclarations,
  entryComponents: [ TextMessageComponent, CarInfoMessageComponent ]
})
export class ChatStreamModule { }

