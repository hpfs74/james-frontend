import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AssistantConfig } from '@app/core/models/assistant';
import { TagsService } from '@app/core/services/tags.service';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';

// Core actions
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// Other actions
import * as wizardActions from '@app/core/actions/wizard';

import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { environment } from '@env/environment';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as fromHouseHold from '@app/house/reducers';

enum Steps {
  DETAILS,
  LEGAL,
  PAYMENT
}

@Component({
  templateUrl: 'house-hold-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldBuyComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  // State of the advice forms data
  subscription$: Subscription[] = [];
  wizardSteps = Steps;
  selectedInsurances$: Observable<CalculatedPremium>;


  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService,
              private router: Router,
              public knxWizardService: KNXWizardRxService,
              private featureConfigService: FeatureConfigService) {

    this.translateService
      .get([
        'household.buy.steps.step1.title',
        'household.buy.steps.step2.title',
        'household.buy.steps.step3.title'
      ])
      .subscribe(data => {
        this.formSteps = Object
          .keys(data)
          .map(key => data[key])
          .map(v => ({label: v}));
      });
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));

    // bind observables
    this.subscription$ = [];
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.selectedInsurances$ = this.store$.select(fromHouseHold.getNewFlowAdviceSelectedHouseHoldPremium);
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass(step) {
    return {
      [`knx-house-hold-advice--step-${step + 1}`]: true
    };
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }

}
