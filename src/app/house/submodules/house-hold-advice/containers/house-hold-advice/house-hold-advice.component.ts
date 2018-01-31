import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions } from '@knx/wizard';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cuid from 'cuid';


import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AssistantConfig } from '@app/core/models/assistant';
import { TagsService } from '@app/core/services/tags.service';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { KNXWizardRxComponent } from '@app/components/knx-wizard-rx/knx-wizard-rx.component';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromCore from '@app/core/reducers';

// Core actions
import * as router from '@app/core/actions/router';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// Other actions
import * as wizardActions from '@app/core/actions/wizard';

import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';


enum houseHoldFormSteps {
  location,
  houseType,
  houseDetails,
  dekking
}
@Component({
  templateUrl: 'house-hold-advice.component.html',
  styleUrls: ['./house-hold-advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldAdviceComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  // State of the advice forms data
  subscription$: Array<any> = [];
  // Forms
  // houseHoldExtrasForm: HouseHoldExtrasForm;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private router: Router,
              public knxWizardService: KNXWizardRxService) {
    this.formSteps = [
      {
        label: 'Locatie',
      },
      {
        label: 'Huis type',
      },
      {
        label: 'Huis details',
      },
      {
        label: 'Dekking'
      }
    ];
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
    // initialize forms
    const formBuilder = new FormBuilder();

    // TODO: activat house hold extra option form
    // this.houseHoldExtrasForm = new HouseHoldExtrasForm(formBuilder,
    //   this.tagsService.getAsLabelValue('house_hold_glass_coverage'));

    // this.subscription$.push(
    //   this.houseHoldExtrasForm.formGroup.valueChanges
    //     .debounceTime(200)
    //     .filter(() => this.knxWizardService.currentStepIndex === houseHoldFormSteps.results)
    //     .subscribe(data => {
    //       // dispatch refresh for the advice
    //     });
    // );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass(step) {
    return {
      ['knx-house-hold-advice--step-' + (step + 1)]: true
    };
  }

  private onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  private proceedWithAdvice(advices, insurances) {
    // TODO: adapt to new advice schema
    // this.store$.dispatch(new advice.Get(insurances[0].advice_item_id));
    // this.store$.dispatch(new advice.Update(Object.assign({}, advices[0])));
    // this.subscription$.push(
    //   this.insurance$.subscribe(insurance => {
    //     if (insurance) {
    //       this.subscription$.push(this.store$.select(fromInsurance.getSelectedInsurance)
    //         .filter(selectedInsurance => selectedInsurance !== null).subscribe(
    //           selectedInsurance => {
    //             if (selectedInsurance.advice_expires_at * 1000 > new Date().getTime()) {
    //               this.proceedToBuy();
    //             } else {
    //               this.store$.dispatch(new router.Go({ path: ['/household/extras'] }));
    //               this.store$.dispatch(new advice.RemoveLatestInsuranceAdvice());
    //             }
    //           }));
    //     }
    //   })
    // );
  }

  private proceedToBuy() {
    // TODO: adapt to new advice schema
    // this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
    //   advice => {
    //     if (advice && advice.id) {
    //       this.store$.dispatch(new router.Go({
    //         path: ['/household/insurance/contact-detail', { adviceId: advice.id }],
    //       }));
    //     }
    //   }));
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }
}
