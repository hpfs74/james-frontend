import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AsyncPipe } from '@angular/common';

import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

import { CalculatedPremium, HouseHoldPremiumResponse, HouseHoldSearchCriteria } from '@app/house/models/house-hold-premium';
import { Insurance, InsuranceAdvice } from '@insurance/models';
import { HouseHoldDetailForm } from './house-hold-buy-details.form';
import { FormBuilder } from '@angular/forms';
import { TagsService } from '@app/core/services';
import { TranslateService } from '@ngx-translate/core';
import { AddressForm } from '@app/address/components/address.form';
import { Subscription } from 'rxjs/Subscription';
import { ContactDetails, InsuranceStore } from '@app/house/models/house-hold-store';
import { Address } from '@app/address/models';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromCore from '@app/core/reducers';
import * as fromHouseHold from '@app/house/reducers';
import * as fromRoot from '@app/reducers';
import * as fromHouse from '@app/house/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';
import * as householddataActions from '@app/house/actions/house-hold-data';
import * as fromAddress from '@app/address/reducers';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import * as router from '@core/actions/router';

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
  address: Address;
  subscriptions: Subscription[] = [];
  selectedInsurances$: Observable<CalculatedPremium>;
  contactDetails: ContactDetails;


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
      'household.common.step.options.backButtonLabel',
      'household.premium.buy.your_email.label',
      'household.buy_details_address_error',
      'household.details_go_back_to_insurance',
      'household.details_go_forward_to_security'
    ]).subscribe(res => {
      this.copies = res;
      this.initForms();
    });
    this.currentStepOptions = {
      nextButtonLabel: this.copies['household.details_go_forward_to_security'],
      backButtonLabel: this.copies['household.details_go_back_to_insurance'],
    };
    this.initSubscriptions();
  }

  ngOnInit() {
    this.selectedInsurances$ = this.store$.select(fromHouseHold.getNewFlowAdviceSelectedHouseHoldPremium);

    this.subscriptions.push(
      this.store$.select(fromHouseHold.getHouseHoldNewFlowAdvice)
        .filter(data => !!data)
        .subscribe((insuranceStore: InsuranceStore) => this.handleHouseholdContactDetails(insuranceStore.contacts)),
      this.store$.select(fromHouseHold.getHouseDataAddress)
        .filter(data => data !== null)
        .subscribe(data => {
          this.address = Object.assign({}, data);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initForms() {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldDetailForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_gender'),
      this.copies);
    this.addressForm = new AddressForm(formBuilder);
  }

  handleHouseholdContactDetails(houseHoldContactDetails: ContactDetails) {

    this.contactDetails = houseHoldContactDetails;
    const formValues = {
      sameAddress: houseHoldContactDetails.sameAddress,
      gender: houseHoldContactDetails.gender,
      firstName: houseHoldContactDetails.firstName,
      prefix: houseHoldContactDetails.prefix,
      lastName: houseHoldContactDetails.lastName,
      initials: houseHoldContactDetails.initials,
      email: houseHoldContactDetails.email
    };
    this.form.formGroup.patchValue(Object.assign({}, formValues));
    if (!this.form.formGroup.get('sameAddress').value) {
      const postalCode = houseHoldContactDetails.address.postcode;
      const houseNumber = this.normalizeAddressHouseNumber(houseHoldContactDetails);
      const houseNumberExtension = this.normalizeAddressHouseNumberAddition(houseHoldContactDetails);
      const addressFormValues = {
        postalCode: postalCode,
        houseNumber: houseNumber,
        houseNumberExtension: houseNumberExtension
      };
      this.addressForm.formGroup.patchValue(Object.assign({}, addressFormValues));
    }
  }

  initSubscriptions() {
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.subscriptions.push(
      this.store$.select(fromAddress.getAddress)
        .filter(data => data !== null && !this.form.formGroup.get('sameAddress').value)
        .subscribe(data => {
          this.address = Object.assign({}, data);
        }),
      this.form.formGroup.get('sameAddress').valueChanges
        .filter(value => !!value)
        .subscribe(value => {
          this.store$.select(fromHouseHold.getHouseDataAddress)
            .filter(data => data !== null)
            .take(1)
            .subscribe(data => {
              this.address = Object.assign({}, data);
            });
        })
    );
  }

  goToPreviousStep() {
    this.store$.dispatch(new router.Go({path: ['/inboedel/advies-detail']}));
  }

  goToNextStep() {
    const detailForm = this.form.formGroup;

    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    FormUtils.validateControls(this.addressForm.formGroup, Object.keys(this.addressForm.formGroup.controls));
    if (!detailForm.get('sameAddress').value) {
      const postalCode = this.addressForm.formGroup.get('postalCode').value;
      const houseNumber = this.addressForm.formGroup.get('houseNumber').value;
      const houseNumberExtension = this.addressForm.formGroup.get('houseNumberExtension').value;
      if (!postalCode || !houseNumber) {
        return this.store$.dispatch(new wizardActions.Error({
          message: this.copies['household.buy_details_address_error']
        }));
      }

      if (postalCode === this.contactDetails.address.postcode
        && houseNumber === this.contactDetails.address.number_extended.number_only
        && houseNumberExtension === this.contactDetails.address.number_extended.number_extension) {
        return this.store$.dispatch(new wizardActions.Error({
          message: this.copies['household.buy_details_address_error']
        }));
      }
    }
    if (!this.form.formGroup.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    const firstName = this.form.formGroup.get('firstName').value;
    const prefix = this.form.formGroup.get('prefix').value;
    const lastName = this.form.formGroup.get('lastName').value;
    const initials = this.form.formGroup.get('initials').value;
    const gender = this.form.formGroup.get('gender').value;
    const email = this.form.formGroup.get('email').value;
    const contactDetails = {
      sameAddress: this.form.formGroup.get('sameAddress').value,
      gender: gender,
      firstName: firstName,
      prefix: prefix,
      lastName: lastName,
      initials: initials,
      address: this.address,
      email: email,
      addressForComminications: this.contactDetails.address
    };
    this.store$.select(fromHouseHold.getHouseHoldNewFlowAdvice)
      .take(1)
      .subscribe((newFlowAdvice: InsuranceStore) => {
        const insuranceStore = Object.assign(
          {},
          newFlowAdvice,
          {
            contacts: Object.assign({}, newFlowAdvice.contacts, contactDetails)
          }
        );
        this.store$.dispatch(new householddataActions.NewFlowAdviceStore(insuranceStore));
        this.store$.dispatch(new wizardActions.Forward());
      });
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
}
