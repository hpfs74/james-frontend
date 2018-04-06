import { Component, OnDestroy, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from '@app/core/services/tags.service';

import * as fromRoot from '@app/reducers';
import * as fromAddress from '@app/address/reducers';
import * as houseDataActions from '@app/house/actions/house-data';
import * as fromHouseData from '@app/house/reducers/house-data';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import * as assistant from '@app/core/actions/assistant';
import * as FormUtils from '@app/utils/base-form.utils';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';


import { AddressForm } from '@app/address/components/address.form';
import { Address } from '@app/address/models';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { HouseHoldLocationForm } from './house-hold-location.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import { HouseHoldAmountRequest } from '@app/house/models/house-hold-amount';
import {
  getHouseDataAddress, getHouseDataResult, getHouseHoldDataAdvice,
  getHouseHoldDataInfo
} from '@app/house/reducers';
import { TranslateService } from '@ngx-translate/core';
import { HouseDataRequest } from '@app/house/models/house-data';
import 'rxjs/add/operator/filter';

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
  amount$: Observable<HouseHoldAmountRequest>;
  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  subscriptions$: Subscription[] = [];
  copies: any = {};

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService) {

    this.translateService.get([
      'household.advice.steps.step1.title',
      'household.locatie.step.options.nextButtonLabel'
    ]).subscribe(res => {
      this.copies = res;

      this.currentStepOptions = {
        label: this.copies['household.advice.steps.step1.title'],
        nextButtonLabel: this.copies['household.locatie.step.options.nextButtonLabel'],
        hideBackButton: true,
        hideNextButton: false,
        nextButtonClass: 'knx-button knx-button--3d knx-button--primary'
      };
    });

    this.initializeForms();

  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.addressForm = new AddressForm(formBuilder);
    this.form = new HouseHoldLocationForm(formBuilder,
      this.tagsService.getAsLabelValue('house_hold_flow_house_hold'));
  }

  selectInitialStates(): void {
    this.address$ = this.store$.select(fromAddress.getAddress);
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  setInitialSubscriptions(): void {
    this.subscriptions$ = [
      this.address$
        .filter(data => data !== null)
        .subscribe(value => {
          this.store$.dispatch(new houseDataActions.GetInfo({
            Zipcode: value.postcode,
            HouseNumber: value.number_extended ? value.number_extended.number_only : null,
            HouseNumberAddition: value.number_extended ? value.number_extended.number_extension : null
          } as HouseDataRequest));
        }),

      // get the current house hold request info
      this.store$.select(getHouseHoldDataInfo)
        .take(1)
        .subscribe((data) => this.setOwnedBuilding(data)),

      // get the result of the api call to risk for house data info
      this.store$.select(getHouseDataResult)
        .filter(data => data !== null)
        .subscribe(data => this.setHouseTypePrefill(data)),

      // check if the advice is active otherwise will start one
      this.store$.select(getHouseHoldDataAdvice)
        .subscribe((advice) => {
          if (!advice) {
            this.store$.dispatch(new houseHoldData.Start());
          }
        })
    ];
  }

  /**
   * set the data about house type in the store
   *
   * @param data - payload object from the risk api
   */
  setHouseTypePrefill(data) {

    this.store$.dispatch(new houseHoldData.Update({
      RoomCount: data.RoomCount,
      SurfaceArea: data.SurfaceArea,
      Volume: data.Volume,
      HouseType: data.HouseType,
      BuildYear: data.BuildYear
    }));
  }

  /**
   * update form values
   *
   * @param value
   */
  setOwnedBuilding(value) {
    if (!value) {
      return;
    }
    this.addressForm.formGroup.patchValue(Object.assign({}, {
      postalCode: value.Zipcode,
      houseNumber: value.HouseNumber,
      houseNumberExtension: value.HouseNumberAddition
    }));

    this.form.formGroup.patchValue(Object.assign({}, {
      houseHold: value.OwnedBuilding
    }));

    setTimeout(() => {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
      FormUtils.updateAndValidateControls(this.addressForm.formGroup, value);
    });
  }

  ngAfterViewInit(): void {

    this.selectInitialStates();
    this.setInitialSubscriptions();

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
    this.subscriptions$.forEach((el) => el.unsubscribe());
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    const addressForm = this.addressForm.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid || !addressForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    this.subscriptions$.push(
      Observable.combineLatest(this.address$, (address) => {
        if (!address) {
          return;
        }

        return {
          Zipcode: address.postcode,
          HouseNumber: address.number_extended.number_only,
          HouseNumberAddition: address.number_extended.number_extension,
          OwnedBuilding: detailForm.value.houseHold,
          address: address
        };
      })
        .take(1)
        .subscribe((step1) => {
          this.store$.dispatch(new houseDataActions.UpdateAddress(step1.address));

          this.store$.dispatch(new houseHoldData.Update({
            OwnedBuilding: step1.OwnedBuilding,
            Zipcode: step1.Zipcode,
            HouseNumber: step1.HouseNumber,
            HouseNumberAddition: step1.HouseNumberAddition,
            CommencingDate: new Date()
          }));
        }));

    this.store$.dispatch(new wizardActions.Forward());

  }
}
