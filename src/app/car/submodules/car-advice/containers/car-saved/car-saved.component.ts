import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AssistantConfig, CannedMessageType } from '@app/core/models';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { SharedService, TEMP_VARIABLE_KEYS } from '@app/shared/services/shared.service';

import * as fromRoot from '@app/car/reducers';
import * as fromCore from '@app/core/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as fromInsurance from '@app/insurance/reducers';
import * as fromProfile from '@app/profile/reducers';
import * as router from '@app/core/actions/router';
import * as auth from '@app/auth/actions/auth';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'knx-car-saved',
  templateUrl: './car-saved.component.html',
  styleUrls: ['./car-saved.component.scss']
})
export class CarSavedComponent implements OnInit {
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

  }

  ngOnInit() {
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurances);
    this.profile$.subscribe(profile => {
        this.firstName = profile.firstname || '';
        this.email = profile.emailaddress || '';
      }
    );
    let dispatchAction: CannedMessageType = {
      key: 'car.purchased.without.insurances',
      clear: true,
      value: ' ' + this.firstName
    };
    this.savedInsurances$
      .filter(savedInsurances => savedInsurances && savedInsurances.car)
      .take(1)
      .subscribe(savedInsurances => {
        if (savedInsurances.car.insurance.length) {
          dispatchAction.key = 'car.purchased.with.insurances';
        }
        this.store$.dispatch(new assistant.AddCannedMessage(dispatchAction));
      });
  }

  startNewAdvice() {
    this.sharedService.tempVariables.set(TEMP_VARIABLE_KEYS.carFlow, true);
    this.store$.dispatch(new router.Go({path: ['car']}));
  }

  getTimeOfDay(): string {
    let today = new Date();
    let currentHour = today.getHours();
    let timeOfDay = '';
    if (currentHour < 12) {
      timeOfDay = 'car.purchased.greeting.morning';
    } else if (currentHour < 18) {
      timeOfDay = 'car.purchased.greeting.afternoon';
    } else {
      timeOfDay = 'car.purchased.greeting.night';
    }
    return timeOfDay;
  }

  hasPurchasedInsurances(): Observable<boolean> {
    return this.savedInsurances$
        .filter(purchasedInsurances => purchasedInsurances !== null)
        .take(1)
        .map(purchasedInsurances => {
          const insurances = purchasedInsurances.car.insurance;
          if (insurances.length && insurances.filter(insurance =>
            (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
            return true;
          }
          return false;
      });
  }
}
