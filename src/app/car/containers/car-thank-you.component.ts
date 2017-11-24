import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../../profile/models/profile';
import { AssistantConfig } from '../../core/models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as fromProfile from '../../profile/reducers';

import * as assistant from '../../core/actions/assistant';
import { scrollToY } from '../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-car-thank-you',
  template: `
    <div class="container knx-container-thank-you">
      <div class="row">
        <div class="col-sm-4 push-sm-8">
          <div class="knx-wizard__sidebar--sticky">
            <knx-chat-stream #knxChatStream
              [options]="chatConfig$ | async"
              [messages]="chatMessages$ | async">
            </knx-chat-stream>
          </div>
        </div>
        <div class="col-sm-8 pull-sm-4" knxBackdropBlur [enableBlur]="knxChatStream.chatExpanded">
          <knx-thank-you title="Autoverzekering aangevraagd!"
            insuranceType="autoverzekering"
            [email]="profileEmail$ | async">
          </knx-thank-you>
        </div>
      </div>
    </div>
  `
})
export class CarThankYouComponent implements AfterViewInit, OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  profileEmail$: Observable<string>;

  constructor(private store$: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profileEmail$ = this.store$.select(fromProfile.getProfile)
    .map((profile: Profile) => profile.emailaddress);
  }

  ngOnInit() {
    scrollToY();
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.thankyou', clear: true }));
    this.profileEmail$.take(1).subscribe((email) => {
      this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.finalEmail', value: email}));
    });
  }
}
