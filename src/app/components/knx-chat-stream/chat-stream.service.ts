/* tslint:disable */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ChatMessage } from '../../models/chat-message';

@Injectable()
export class ChatStreamService {

  private addMessageSource = new Subject<ChatMessage>();

  addMessage$ = this.addMessageSource.asObservable();

  addMessage(message: ChatMessage) {
    this.addMessageSource.next(message);
  }
}
