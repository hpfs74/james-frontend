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
import { HouseHoldLocationForm } from '@app/house-hold/containers/house-hold-location/house-hold-location.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';

@Component({
  selector: 'knx-house-hold-location-form',
  styleUrls: ['./house-hold-location.component.scss'],
  templateUrl: 'house-hold-location.component.html'
})
export class HouseHoldLocationComponent implements AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldLocation;
  form: HouseHoldLocationForm;
  addressForm: AddressForm;
  address$: Observable<Address>;
  advice$: Observable<any>;
  subscriptions$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  constructor(private store$: Store<fromRoot.State>,
    private tagsService: TagsService) {
    this.initializeForms();
    this.selectInitalStates();
    this.setInitialSubscriptions();
    this.currentStepOptions = {
      label: 'Locatie',
      nextButtonLabel: 'Huis type',
      hideBackButton: true,
      hideNextButton: false
    };
  }

  selectInitalStates(): void {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    this.form = new HouseHoldLocationForm(formBuilder, this.tagsService.getAsLabelValue('insurance_flow_household'));
  }

  /**
   * put all subscriptions in an array, so we can unsubscribe to them later on
   */
  setInitialSubscriptions(): void {
    this.subscriptions$ = [ ];
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
    this.subscriptions$.forEach(subsription => subsription.unsubscribe());
  }

  private normalizeAddressHouseNumber(payload: any) {
    if (!payload.address) {
      return null;
    }

    return payload.address.number_extended.number_only;
  }

  private normalizeAddressHouseNumberAddition(payload: any) {
    if (!payload.address) {
      return null;
    }
    return payload.address.number_extended.number_extension;
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid || !addressForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
  }
}
