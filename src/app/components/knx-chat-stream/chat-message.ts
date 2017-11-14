import { Type } from '@angular/core';

export class ChatMessage {
  constructor(public component: any, public data: any, public lookupKey?: string) { }
}
