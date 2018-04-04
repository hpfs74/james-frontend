import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AsyncPipe } from '@angular/common';

// core
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

// reducers
import * as fromRoot from '@app/reducers';
import * as fromHouse from '@app/house/reducers';

// actions
import * as wizardActions from '@app/core/actions/wizard';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';
import * as householddata from '@app/house/actions/house-hold-data';

// models
import { CalculatedPremium, HouseHoldPremiumResponse } from '@app/house/models/house-hold-premium';
import { Insurance, InsuranceAdvice } from '@insurance/models';
import 'rxjs/add/operator/filter';
import { HouseHoldDetailForm } from '@app/house/submodules/house-hold-buy/containers/house-hold-buy-details/house-hold-buy-details.form';
import { FormBuilder } from '@angular/forms';
import { TagsService } from '@app/core/services';
import { TranslateService } from '@ngx-translate/core';
import { AddressForm } from '@app/address/components/address.form';
import * as FormUtils from '@app/utils/base-form.utils';
import * as fromCore from '@app/core/reducers';
import { Subscription } from 'rxjs/Subscription';
import * as fromHouseHold from '@app/house/reducers';

@Component({
  providers: [AsyncPipe],
  selector: 'knx-house-hold-buy-details',
  templateUrl: './house-hold-buy-details.component.html',
  styleUrls: ['./house-hold-buy-details.component.scss'],
})
export class HouseHoldBuyDetailsComponent implements OnInit, OnDestroy {
  currentStepOptions: KNXWizardStepRxOptions;
  qaRootId = QaIdentifiers.houseHoldBuyDetail;
  form: HouseHoldDetailForm;
  addressForm: AddressForm;
  copies: any;
  error$: any;
  address: any;
  subscriptions: Subscription[] = [];
  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private tagsService: TagsService) {

    this.translateService.get([
      'household.detail.form_initials_label',
      'household.detail.form_initials_placeholder',
      'household.detail.form_firstName_label',
      'household.detail.form_firstName_placeholder',
      'household.detail.form_prefix_label',
      'household.detail.form_prefix_placeholder',
      'household.detail.form_lastName_label',
      'household.detail.form_lastName_placeholder',
      'car.advice.steps.detail.form.gender.label',
      'car.advice.steps.detail.form.gender.placeholder',
      'household.details.form_sameAddress_label',
      'household.details.form_sameAddress_yes_value',
      'household.details.form_sameAddress_no_value',
      'household.detail.next_step',
      'household.common.step.options.backButtonLabel'
    ]).subscribe(res => {
      this.copies = res;
      this.initForms();
    });
    this.currentStepOptions = {
      nextButtonLabel: this.copies['household.detail.next_step'],
      backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
    };
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  initForms() {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_gender'),
      this.copies);
    this.addressForm = new AddressForm(formBuilder);
  }

  initSubscriptions() {
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.subscriptions.push(
      this.store$.select(fromHouseHold.getHouseDataAddress)
        .filter(data => data !== null)
        .subscribe(data => {
          this.address = JSON.stringify(Object.assign({}, data));
        })
    );
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    this.store$.dispatch(new wizardActions.Forward());
  }
}
