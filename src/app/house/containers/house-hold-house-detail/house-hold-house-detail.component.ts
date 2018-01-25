import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '@app/core/services/tags.service';


import * as cuid from 'cuid';
import * as fromRoot from '@app/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';

import { AddressForm } from '@app/address/components/address.form';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { HouseHoldHouseDetailForm } from '@app/house/containers/house-hold-house-detail/house-hold-house-detail.form';

@Component({
  selector: 'knx-house-hold-house-detail-form',
  styleUrls: ['./house-hold-house-detail.component.scss'],
  templateUrl: 'house-hold-house-detail.component.html'
})
export class HouseHoldHouseDetailComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldHouseDetail;
  form: HouseHoldHouseDetailForm;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  alive: boolean;

  constructor(private store$: Store<fromRoot.State>,
    private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitalStates();

    this.currentStepOptions = {
      label: 'Huis details',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Dekking',
      hideBackButton: false,
      hideNextButton: false
    };
    this.alive = true;
  }

  selectInitalStates(): void {
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldHouseDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('insurance_flow_household'));
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

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;

    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    this.store$.dispatch(new wizardActions.Forward());
  }
}
