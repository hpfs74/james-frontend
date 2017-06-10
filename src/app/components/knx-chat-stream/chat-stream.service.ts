/* tslint:disable */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ChatMessage } from './chat-message';
import { TextMessageComponent } from './text-message.component';
import { CarInfoMessageComponent } from '../knx-car-info-message';

@Injectable()
export class ChatStreamService {

  private addMessageSource = new Subject<ChatMessage>();

  addMessage$ = this.addMessageSource.asObservable();

  addTextMessage(data, replace: boolean = false) {
    this.addMessageSource.next(new ChatMessage(TextMessageComponent, data, replace));
  }
}
