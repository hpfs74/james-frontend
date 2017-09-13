import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig } from '../../../models/assistant';
import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../../reducers';
import * as assistant from '../../../actions/assistant';

@Component({
  selector: 'knx-car-thank-you',
  template: `
    <div class="container knx-container-thank-you">
      <div class="row">
        <div class="col-sm-4 push-sm-8">
          <div class="knx-wizard__sidebar--sticky">
            <knx-chat-stream [options]="chatConfig$ | async" [messages]="chatMessages$ | async"></knx-chat-stream>
          </div>
        </div>
        <div class="col-sm-8 pull-sm-4">
          <knx-thank-you title="Autoverzekering aangevraagd!" insurance="autoverzekering" email="test@mail.nl"></knx-thank-you>
        </div>
      </div>
    </div>
  `
})
export class CarThankYouComponent implements AfterViewInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor(private store$: Store<fromRoot.State>) {
    this.chatConfig$ = store$.select(fromRoot.getAssistantConfig);
    this.chatMessages$ = store$.select(fromRoot.getAssistantMessageState);
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.thankyou', clear: true }));
  }
}
