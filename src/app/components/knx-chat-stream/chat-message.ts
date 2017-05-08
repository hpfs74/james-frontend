import { Type } from '@angular/core';

export class ChatMessage {
  constructor(public component: Type<any>, public data: any) { }
}
