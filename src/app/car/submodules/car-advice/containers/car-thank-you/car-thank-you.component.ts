import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Profile } from '@app/profile/models/profile';
import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';

import * as fromAuth from '@app/auth/reducers';
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';

import { Content, ContentConfig } from '@app/content.config';

@Component({
  selector: 'knx-car-thank-you',
  templateUrl: './car-thank-you.component.html'
})
export class CarThankYouComponent implements AfterViewInit {
  content: Content;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  email$: Observable<string>;
  loggedIn$: Observable<any>;

  constructor(private store$: Store<fromRoot.State>, private route: ActivatedRoute, private contentConfig: ContentConfig) {
    this.content = contentConfig.getContent();
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);

    let profileEmail$ = this.store$.select(fromProfile.getProfile).map((profile: Profile) => profile.emailaddress);
    let isAnonymous$ = this.store$.select(fromAuth.getLoggedIn);
    let advice$ = this.store$.select(fromInsurance.getSelectedAdvice);

    this.email$ = Observable.combineLatest(profileEmail$, isAnonymous$, advice$)
      .map((combined) => {
        let email = combined[0];
        const loggedIn = combined[1];
        const advice = combined[2];

        if (!loggedIn && advice) {
          email = advice.email || advice.emailaddress;
        }

        return email;
      });
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.thankyou', clear: true }));

    this.email$.take(1).subscribe((email) => {
      this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.buy.finalEmail', value: email}));
    });
  }
}
