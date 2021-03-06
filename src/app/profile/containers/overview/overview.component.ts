import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { Profile } from '@app/profile/models/profile';
import { FeatureConfigService } from '@app/core/services/feature-config.service';

import * as fromProfile from '@app/profile/reducers';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as profile from '@app/profile/actions/profile';
import * as fromInsurance from '@app/insurance/reducers';
import * as layout from '@app/core/actions/layout';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  savedInsurances$: Observable<any>;

  profile$: Observable<Profile>;
  profileLoading$: Observable<boolean>;
  constructor(private store$: Store<fromProfile.State>,
              public featureToggleService: FeatureConfigService) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurances);
    this.profileLoading$ = this.store$.select(fromProfile.getProfileLoading);
    this.store$.dispatch(new profile.LoadAction());
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction());
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'profile.hello' }));
  }

  editProfile() {
    this.store$.dispatch(new router.Go({ path: ['/profile-edit'] }));
  }

  editPassword() {
    this.store$.dispatch(new router.Go({ path: ['/profile-edit-password'] }));
  }

  goBack() {
    this.store$.dispatch(new router.Back());
  }

  deleteProfile() {
    this.store$.dispatch(new layout.OpenModal('deleteProfileModal'));
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
