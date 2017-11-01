import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig } from '../../core/models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';

import * as fromRoot from '../../reducers';
import * as fromCore from '../../core/reducers';
import * as assistant from '../../core/actions/assistant';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';

@Component({
  selector: 'knx-car-purchased',
  template: `
    <div class="container-fluid knx-container--fullwidth knx-container--gray knx-container--status"
         [ngClass]="{'backdrop-blur': isBlurred}">
      <div class="container">
        <div class="col-md-12">
          <b>Welkom<span *ngIf="firstName || email"> {{firstName || email}}</span>!</b>
        </div>
      </div>
    </div>

    <div class="container">
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
          <knx-purchased title="Uw autoverzekering" [insurances]="purchasedInsurances$ | async"></knx-purchased>
        </div>
      </div>
    </div>
  `
})
export class CarPurchasedComponent implements AfterViewInit, OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  purchasedInsurances$: Observable<string>;
  profile$: Observable<any>;
  email: string;
  firstName: string;
  isBlurred = false;

  constructor(private store$: Store<fromRoot.State>) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
  }

  ngOnInit() {
    this.purchasedInsurances$ = this.store$.select(fromInsurance.getPurchasedInsurance);
    this.profile$.subscribe( profile => {
        this.firstName = profile.firstname || '';
        this.email = profile.emailaddress || '';
      }
    );
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.purchased', clear: true, value: ' ' + this.firstName }));
  }

  blurWizard(chatIsOpened) {
    this.isBlurred = chatIsOpened;
  }
}
