import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '@app/core/services/tags.service';


import * as cuid from 'cuid';
import * as fromRoot from '@app/reducers';
import * as fromAddress from '@app/address/reducers';
import * as fromHouseData from '../../reducers/house-data';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as houseDataActions from '../../actions/house-data';
import * as fromCore from '@app/core/reducers';
import * as advice from '@insurance/actions/advice';


import { AddressForm } from '@app/address/components/address.form';
import { Address } from '@app/address/models';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { HouseHoldLocationForm } from '@app/house/containers/house-hold-location/house-hold-location.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/combineLatest';

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
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  alive: boolean;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {

    this.initializeForms();
    this.selectInitialStates();
    this.setInitialSubscriptions();

    this.currentStepOptions = {
      label: 'Locatie',
      nextButtonLabel: 'Huis type',
      hideBackButton: true,
      hideNextButton: false
    };

    this.alive = true;
  }

  selectInitialStates(): void {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    this.form = new HouseHoldLocationForm(formBuilder, this.tagsService.getAsLabelValue('insurance_flow_household'));
  }

  setInitialSubscriptions(): void {
    this.store$.select(fromHouseData.getAddress)
      .takeWhile( () => this.alive)
      .subscribe(data => this.setAddress(data));
  }

  setAddress(value) {
    if (value.address) {
      this.addressForm.formGroup.patchValue(Object.assign({}, {
        postalCode:  value.address.postcode,
        houseNumber: value.address.number_extended.number_only,
        houseNumberExtension: value.address.number_extended.number_extension
      }));
    }
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
    const addressForm = this.addressForm.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid || !addressForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    Observable.combineLatest(this.address$, (address) => {
      return {
        Zipcode: address.postcode,
        HouseNumber: address.number_extended.number_only,
        HouseNumberAddition: address.number_extended.number_extension,
        OwnedBuilding: detailForm.value.houseHold
      };
    });

    this.store$.dispatch(new wizardActions.Forward());
  }
}
