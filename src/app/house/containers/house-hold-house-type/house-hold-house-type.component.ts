import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '@app/core/services/tags.service';


import * as cuid from 'cuid';
import * as fromRoot from '@app/reducers';
import * as fromAddress from '@app/address/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';

import { AddressForm } from '@app/address/components/address.form';
import { Address } from '@app/address/models';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { HouseHoldLocationForm } from '@app/house/containers/house-hold-location/house-hold-location.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { HouseHoldHouseTypeForm } from '@app/house/containers/house-hold-house-type/house-hold-house-type.form';

@Component({
  selector: 'knx-house-hold-house-type-form',
  styleUrls: ['./house-hold-house-type.component.scss'],
  templateUrl: 'house-hold-house-type.component.html'
})
export class HouseHoldHouseTypeComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldHouseType;
  form: HouseHoldHouseTypeForm;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  address: Address;
  alive: boolean;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitialStates();

    this.currentStepOptions = {
      label: 'Huis type',
      backButtonLabel: 'Terug',
      nextButtonLabel: 'Huis details',
      hideBackButton: false,
      hideNextButton: false
    };

    this.address = {
      street: 'Via le mani dal naso',
      number: '220',
      city: 'Plato',
      province: 'XXXX',
      county: 'YYYY',
      postcode: '2123XX'
    } as Address;

    this.alive = true;
  }

  selectInitialStates(): void {
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldHouseTypeForm(formBuilder,
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
