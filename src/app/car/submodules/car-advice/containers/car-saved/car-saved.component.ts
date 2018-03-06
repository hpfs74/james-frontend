import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig } from '@app/core/models';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';

import * as fromRoot from '../../../../reducers';
import * as fromCore from '../../../../../core/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromProfile from '../../../../../profile/reducers';
import * as router from '../../../../../core/actions/router';
import * as auth from '@app/auth/actions/auth';
import { SharedService, TEMP_VARIABLE_KEYS } from '@app/shared/services/shared.service';

@Component({
  selector: 'knx-car-saved',
  templateUrl: './car-saved.component.html',
  styleUrls: ['./car-saved.component.scss']
})
export class CarSavedComponent implements AfterViewInit, OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  savedInsurances$: Observable<any>;
  profile$: Observable<any>;
  email: string;
  firstName: string;

  constructor(private store$: Store<fromRoot.State>,
              public sharedService: SharedService) {
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    window['shared'] = this;
  }

  ngOnInit() {
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurances);
    this.profile$.subscribe(profile => {
        this.firstName = profile.firstname || '';
        this.email = profile.emailaddress || '';
      }
    );
  }

  test() {
    this.store$.dispatch(new router.Go({path: ['/car/thank-you']}));
  }

  ngAfterViewInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'car.purchased', clear: true, value: ' ' + this.firstName }));
  }

  startNewAdvice() {
    this.sharedService.tempVariables.set(TEMP_VARIABLE_KEYS.carFlow, true);
    this.store$.dispatch(new router.Go({path: ['car']}));
  }
}
