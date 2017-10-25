import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig } from '../../core/models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as assistant from '../../core/actions/assistant';

@Component({
  selector: 'knx-car-thank-you',
  template: `
    <div class="container knx-container-thank-you">
      <div class="row">
        <div class="col-sm-4 push-sm-8">
          <div class="knx-wizard__sidebar--sticky">
            <knx-chat-stream
              [options]="chatConfig$ | async"
              [messages]="chatMessages$ | async"
              (onChatExpand)="blurWizard($event)">
            </knx-chat-stream>
          </div>
        </div>
        <div class="col-sm-8 pull-sm-4" [ngClass]="{'backdrop-blur': isBlurred}">
          <knx-thank-you title="Autoverzekering aangevraagd!"
            insuranceType="autoverzekering"
            [email]="email"></knx-thank-you>
        </div>
      </div>
    </div>
  `
})
export class CarThankYouComponent implements AfterViewInit, OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  email: string;
  isBlurred = false;

  constructor(private store$: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.email = params['email'];
    });
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.thankyou', clear: true }));
    if (this.email) {
      this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.finalEmail', value: this.email}));
    }
  }

  blurWizard(chatIsOpened) {
    this.isBlurred = chatIsOpened;
  }
}
