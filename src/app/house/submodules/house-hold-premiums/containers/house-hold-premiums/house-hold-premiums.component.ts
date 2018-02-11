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
import * as fromHouseHold from '@app/house/reducers';

// Core actions
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// House hold actions
import * as housedata from '@app/house/actions/house-data';

// Other actions
import * as wizardActions from '@app/core/actions/wizard';

import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { Subscription } from 'rxjs/Subscription';
import { HouseHoldPremiumsFilterForm } from '../house-hold-premiums-filter/house-hold-premiums-filter.form';
import { HouseHoldData } from '@app/house/models/house-hold-data';
import * as router from '@core/actions/router';
import { UIPair } from '@core/models/ui-pair';
import { getHouseHoldDataInfo } from '@app/house/reducers';
import * as advice from '@insurance/actions/advice';
import { HouseHoldAmountRequest } from '@app/house/models/house-hold-amount';
import * as householdinsuranceamount from '@app/house/actions/house-hold-insurance-amount';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

/**
 * HouseHoldPremiumsComponent
 *
 *
 */
@Component({
  templateUrl: 'house-hold-premiums.component.html',
  styleUrls: ['./house-hold-premiums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldPremiumsComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldPremiumsRoot;

  pills: UIPair[] = [];
  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  advice$: Observable<HouseHoldData>;
  houseHoldData$: Observable<HouseHoldData>;

  // State of the advice forms data
  subscription$: Subscription[] = [];

  // Forms
  houseHoldFilterForm: HouseHoldPremiumsFilterForm;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              public knxWizardService: KNXWizardRxService) {

    this.formSteps = ['Premiums list', 'Premium detail', 'Premium buy'].map(el => {
      return {label: el};
    });
    this.houseHoldData$ = this.store$.select(getHouseHoldDataInfo);

  }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));

    // bind observables
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);

    this.advice$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);

    this.pills = [
      {label: 'Insurance details', value: '#insurance'},
      {label: 'General coverages', value: '#general'},
      {label: 'Documenten', value: '#documenten'}
    ];

    const coverageTags: UIPair[] = [
      {label: 'Default', value: '1'},
      {label: 'Extended', value: '2'}
    ];

    // initialize forms
    const formBuilder = new FormBuilder();
    this.houseHoldFilterForm = new HouseHoldPremiumsFilterForm(formBuilder, coverageTags);

    this.houseHoldFilterForm.formGroup.valueChanges
      .debounceTime(200)
      .filter(() => this.knxWizardService.currentStepIndex === 0)
      .subscribe(data => {
        this.store$.dispatch(new houseHoldData.Update({
          Coverage: data.mainCoverage,
          OutsideCoverage: data.outsideCoverage,
          GlassCoverage: data.glassCoverage
        }));
      });
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  private onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  goBack() {
    this.store$.dispatch(new router.Go({path: ['/household/dekking']}));
  }

  goListBack() {
    this.store$.dispatch(new router.Go({path: ['/household/premiums/list']}));
  }

  goDetail() {
    this.store$.dispatch(new router.Go({path: ['/household/premius/detail']}));
  }
}
