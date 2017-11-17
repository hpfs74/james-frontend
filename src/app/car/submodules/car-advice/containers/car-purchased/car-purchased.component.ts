import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig } from '../../../../../core/models/assistant';
import { ChatMessage } from '../../../../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromProfile from '../../../../../profile/reducers';

@Component({
  selector: 'knx-car-purchased',
  templateUrl: './car-purchased.component.html'
})
export class CarPurchasedComponent implements AfterViewInit, OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  purchasedInsurances$: Observable<any>;
  profile$: Observable<any>;
  email: string;
  firstName: string;

  constructor(private store$: Store<fromRoot.State>) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
  }

  ngOnInit() {
    this.purchasedInsurances$ = this.store$.select(fromInsurance.getPurchasedInsurance);
    this.profile$.subscribe(profile => {
        this.firstName = profile.firstname || '';
        this.email = profile.emailaddress || '';
      }
    );
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.purchased', clear: true, value: ' ' + this.firstName }));
  }
}
