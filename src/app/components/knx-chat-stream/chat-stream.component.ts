import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';

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
      <knx-avatar *ngIf="options.showAvatar" [name]="options.avatarName" [title]="options.avatarTitle"></knx-avatar>
      <ng-container knxChatMessageHost></ng-container>
    </div>
`
})
export class ChatStreamComponent implements OnChanges {
  @Input() options: ChatStreamOptions;
  @Input() messages: ChatMessage[];

  @ViewChild(ChatMessageDirective) messageHost: ChatMessageDirective;

  constructor(private componentFactoryResolve: ComponentFactoryResolver) { }

  // ngAfterViewInit() {
  //   this.loadComponent();
  // }

  ngOnChanges(changes: SimpleChanges) {
    for (let message of this.messages) {
      let componentFactory = this.componentFactoryResolve.resolveComponentFactory(message.component);
      let viewContainerRef = this.messageHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      (<IChatMessage>componentRef.instance).data = message.data;
    }
  }
}
