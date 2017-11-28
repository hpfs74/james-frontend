import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../../../../../profile/models/profile';
import { AssistantConfig } from '../../../../../core/models/assistant';
import { ChatMessage } from '../../../../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as fromProfile from '../../../../../profile/reducers';
import { scrollToY } from '../../../../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-car-thank-you',
  templateUrl: './car-thank-you.component.html'
})
export class CarThankYouComponent implements AfterViewInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  profileEmail$: Observable<string>;

  constructor(private store$: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profileEmail$ = this.store$.select(fromProfile.getProfile)
    .map((profile: Profile) => profile.emailaddress);
  }

  ngAfterViewInit() {
    scrollToY();
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.thankyou', clear: true }));
    this.profileEmail$.take(1).subscribe((email) => {
      this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.finalEmail', value: email}));
    });
  }
}
