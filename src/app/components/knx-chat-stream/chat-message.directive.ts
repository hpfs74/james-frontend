import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[knxChatMessageHost]'
})
export class ChatMessageDirective {
  constructor(public viewContainerRef: ViewContainerRef) { };
}
