import { Component, OnInit } from '@angular/core';
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
import * as auth from '@app/auth/actions/auth';
import * as insuranceActions from '@app/insurance/actions/insurance';

import { Content, ContentConfig } from '@app/content.config';
import * as AuthUtils from '@app/utils/auth.utils';

@Component({
  selector: 'knx-car-thank-you',
  templateUrl: './car-thank-you.component.html'
})
export class CarThankYouComponent implements OnInit {
  content: Content;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  email$: Observable<string>;
  loggedIn$: Observable<any>;

  constructor(private store$: Store<fromRoot.State>,
              private contentConfig: ContentConfig) {
  }

  ngOnInit() {
    this.getLatestListOfInsurances();
    this.content = this.contentConfig.getContent();
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);

    let profileEmail$ = this.store$.select(fromProfile.getProfile).map((profile: Profile) => profile.emailaddress);
    let isAnonymous$ = this.store$.select(fromAuth.getLoggedIn);
    let advice$ = this.store$.select(fromInsurance.getSelectedAdvice);

    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.thankyou', clear: true}));

    this.email$ = Observable.combineLatest(profileEmail$, isAnonymous$, advice$,
      (profileEmail, isAnonymous, advice) => this.combineEmail(profileEmail, isAnonymous, advice));

    this.email$
      .take(1)
      .subscribe(email => {
        this.store$.dispatch(new assistant.AddCannedMessage({
          key: 'car.buy.finalEmail',
          value: email
        }));
      });

    if (AuthUtils.tokenIsAnonymous()) {
      this.store$.dispatch(new auth.ResetStates());
    }
  }

  combineEmail(profileEmail, isAnonymous, advice) {
    let email = profileEmail;

    if (!isAnonymous && advice) {
      email = advice.email || advice.emailaddress;
    }

    return email;
  }

  /**
   * update store with latest advices
   * needed for when loggen in user buys advice, and lands to purchased page
  */
  getLatestListOfInsurances() {
    this.store$.dispatch(new insuranceActions.GetInsurances());
  }
}
