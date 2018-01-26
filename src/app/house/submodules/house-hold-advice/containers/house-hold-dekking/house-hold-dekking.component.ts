import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TagsService } from '@app/core/services/tags.service';

import * as fromRoot from '@app/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';


import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { Price } from '@app/shared/models';
import { HouseHoldDekkingForm } from './house-hold-dekking.form';
import * as fromHouse from '@app/house/reducers';
import { HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';

@Component({
  selector: 'knx-house-hold-dekking-form',
  styleUrls: ['./house-hold-dekking.component.scss'],
  templateUrl: 'house-hold-dekking.component.html'
})
export class HouseHoldDekkingComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldDekking;
  form: HouseHoldDekkingForm;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  alive: boolean;
  coverages: Price[];
  isAmountLoaded$: Observable<boolean>;
  isAmountLoading$: Observable<boolean>;
  amount$: Observable<HouseHoldAmountResponse>;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitalStates();
    this.setIntialSubscription();

    this.currentStepOptions = {
      label: 'Dekking',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'CTA',
      hideBackButton: false,
      hideNextButton: false
    };
    this.alive = true;

    this.coverages = [
      {
        id: '1',
        badge: '',
        header: 'Default coverage',
        description: 'When using the default coverage this you are covered for the following topics:',

        features: [
          'USP1 - line 1 line 2',
          'USP2',
          'USP3 - line 1 line 2'
        ]
      },
      {
        id: '2',
        badge: '',
        header: 'Extended coverage',
        description: 'Select this if you also want the additional coverages to covere to following topics',
        features: [
          'USP1 - line 1 line 2',
          'USP2 ',
          'USP3 - line 1 line 2',
          'USP4 - line 1 line 2',
          'USP5'
        ]
      }
    ];
  }

  selectInitalStates(): void {

    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldDekkingForm(formBuilder,
      this.tagsService.getAsLabelValue('insurance_flow_household'));
  }

  setIntialSubscription() {
    this.isAmountLoading$ = this.store$.select(fromHouse.getHouseHoldAmountLoading);
    this.isAmountLoaded$ = this.store$.select(fromHouse.getHouseHoldAmountLoaded);
    this.amount$ = this.store$.select(fromHouse.getHouseHoldAmountResult);
  }

  ngAfterViewInit(): void {
    // set form validators after the view has been fully loaded, otherwise it is getting an error
    this.setFormAsyncValidators();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  setFormAsyncValidators(): void {
  }

  /**
   * close all subscriptions
   */
  ngOnDestroy(): void {
    this.alive = false;
  }

  updateSelectedCoverage(event) {

  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;

    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    this.store$.dispatch(new router.Go({path: ['/house']}));
  }
}
