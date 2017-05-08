import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AvatarComponent } from '../knx-avatar/avatar.component';
import { ChatMessageDirective } from './chat-message.directive';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatMessage } from './chat-message';
import { ChatStreamService } from './chat-stream.service';

// Types of messages
import { TextMessageComponent } from './text-message.component';
import { CarInfoComponent } from '../knx-car-info/car-info.component';
import { CarPreviewComponent } from '../knx-car-info';

const exportableDeclarations = [
  AvatarComponent,
  ChatMessageDirective,
  ChatStreamComponent,
  TextMessageComponent,
  CarInfoComponent,
  CarPreviewComponent,
];

@NgModule({
  imports: [ CommonModule, SharedModule ],
  exports: exportableDeclarations,
  declarations: exportableDeclarations,
  providers: [ChatStreamService],
  entryComponents: [ TextMessageComponent, CarInfoComponent ]
})
export class ChatStreamModule { }

