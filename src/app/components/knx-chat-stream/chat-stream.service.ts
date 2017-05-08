/* tslint:disable */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ChatMessage } from './chat-message';
import { TextMessageComponent } from './text-message.component';
import { CarInfoComponent } from '../knx-car-info';

@Injectable()
export class ChatStreamService {

  private addMessageSource = new Subject<ChatMessage>();

  addMessage$ = this.addMessageSource.asObservable();

  addTextMessage(data) {
    this.addMessageSource.next(new ChatMessage(TextMessageComponent, data));
  }

  addCarMessage(data) {
    this.addMessageSource.next(new ChatMessage(CarInfoComponent, data));
  }
}
