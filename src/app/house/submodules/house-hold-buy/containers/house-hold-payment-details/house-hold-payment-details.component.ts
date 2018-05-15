import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactDetails, InsuranceStore } from '@app/house/models/house-hold-store';
import { Observable } from 'rxjs/Observable';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { HouseHoldPaymentDetailsForm } from './house-hold-payment-details.form';
import { FormBuilder } from '@angular/forms';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Subscription } from 'rxjs/Subscription';
import * as fromCore from '@app/core/reducers';

import * as wizardActions from '@core/actions/wizard';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import * as FormUtils from '@utils/base-form.utils';
import * as fromHouseHold from '@app/house/reducers';
import * as packagePremiumActions from '@app/house/actions/package-premium';
import { PackagePremiumRequest } from '@app/house/models/package-premium';
import 'rxjs/add/operator/filter';
import { Content, ContentConfig } from '@app/content.config';

@Component({
  selector: 'knx-house-hold-payment-details',
  styleUrls: ['./house-hold-payment-details.component.scss'],
  templateUrl: './house-hold-payment-details.component.html'
})
export class HouseHoldPaymentDetailsComponent implements OnInit, OnDestroy {
  contact$: Observable<ContactDetails>;
  selectedInsurances$: Observable<CalculatedPremium>;
  packagePremiumLoaded$: Observable<boolean>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  form: HouseHoldPaymentDetailsForm;
  copies: any;
  subscriptions$: Subscription[] = [];
  insuranceStore$: Observable<InsuranceStore>;
  insuranceStore: InsuranceStore;
  houseHoldRequest$: Observable<HouseHoldPremiumRequest>;
  houseHoldRequest: HouseHoldPremiumRequest;
  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;

  packagePremiumLoading$: Observable<boolean>;
  packagePremiumError$: Observable<boolean>;
  params: any = {};

  acceptKnabTerms = false;
  acceptInsuranceTerms = false;
  content: Content;


  constructor(private store$: Store<fromRoot.State>,
              private translateService: TranslateService,
              public contentConfig: ContentConfig) {

    this.content = contentConfig.getContent();

    const formBuilder = new FormBuilder();

    this.subscriptions$.push(this.translateService.get([
      'general.errors.field_is_required',
      'general.errors.iban_is_invalid',
      'household.payment_details.payment_details.title',
      'household.payment_details.step.options.back_button.label',
      'household.payment_details.step.options.next_button.label',
      'household.payment_details.iban.placeholder',
      'household.payment_details.iban.label',
      'household.payment_details.knabtac.label',
      'household.payment_details.knabtac.error',
      'household.payment_details.risktac.label',
      'household.payment_details.risktac.error',
      'general.errors.network-failure'
    ]).subscribe(res => {
      this.copies = res;

      this.form = new HouseHoldPaymentDetailsForm(formBuilder, this.copies);

      this.currentStepOptions = {
        backButtonLabel: this.copies['household.payment_details.step.options.back_button.label'],
        nextButtonLabel: this.copies['household.payment_details.step.options.next_button.label'],
        hideBackButton: false,
        hideNextButton: false,
        nextButtonClass: 'knx-button knx-button--3d knx-button--primary'
      };
    }));
  }

  /** oninit subscribe everything */
  ngOnInit() {
    this.insuranceStore$ = this.store$.select(fromHouseHold.getHouseHoldNewFlowAdvice);
    this.contact$ = this.store$.select(fromHouseHold.getHouseHoldNewFlowAdviceContact);
    this.selectedInsurances$ = this.store$.select(fromHouseHold.getNewFlowAdviceSelectedHouseHoldPremium);
    this.packagePremiumLoaded$ = this.store$.select(fromHouseHold.getPackagePremiumLoaded);
    this.houseHoldRequest$ = this.store$.select(fromHouseHold.getHouseHoldDataInfo);
    this.packagePremiumLoading$ = this.store$.select(fromHouseHold.getPackagePremiumLoading);
    this.packagePremiumError$ = this.store$.select(fromHouseHold.getPackagePremiumError);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);

    this.setInitialSubscriptions();
  }

  /** ondestroy unsubscribe all */
  ngOnDestroy() {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  /** set component initial subscription */
  setInitialSubscriptions() {

    this.subscriptions$.push(
      this.houseHoldRequest$.subscribe(req => {
        this.houseHoldRequest = req;
      }),
      this.selectedInsurance$.subscribe(ins => {
        this.insurance = ins;
        this.params.InsuranceCompanyName = ins.CompanyName;

      }),
      this.insuranceStore$.subscribe(ins => {
        this.insuranceStore = ins;
      }),
      this.packagePremiumLoaded$
        .filter(x => (x === true))
        .subscribe(x => {
          this.store$.dispatch(new wizardActions.Forward());
        }),
      this.packagePremiumError$
        .filter(x => (x === true))
        .subscribe(err => this.store$.dispatch(new wizardActions.Error({message: this.copies['general.errors.network-failure']})))
    );
  }

  /** handle the going to previous step */
  goToPrevStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  /** check form status and goes to the next step */
  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    FormUtils.validateForm(detailForm);

    this.store$.dispatch(new wizardActions.ResetError());

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    if (!this.acceptInsuranceTerms) {
      return this.store$.dispatch(new wizardActions.Error({message: this.copies['household.payment_details.risktac.error']}));
    }
    if (!this.acceptKnabTerms) {
      return this.store$.dispatch(new wizardActions.Error({message: this.copies['household.payment_details.knabtac.error']}));
    }

    const insurancePayload = Object.assign(
      // this.insuranceStore.houseHoldInsurance.selectedPremium,
      this.houseHoldRequest, {
        Identifier: this.insuranceStore.houseHoldInsurance.selectedPremium.Identifier,
        GuaranteeAgainstUnderinsurance: 'G',
        InsuredAmountValuables: 0,
        Birthdate: this.insuranceStore.contacts.dateOfBirth
      });


    const payload = {
      Name: this.insuranceStore.contacts.lastName,
      NameInfix: this.insuranceStore.contacts.initials,
      // TODO: waiting RISK to fix the bug
      // Initials: this.insuranceStore.contacts.infix,
      Initials: '-',
      Gender: this.insuranceStore.contacts.gender,
      Birthday: this.insuranceStore.contacts.dateOfBirth,
      Email: this.insuranceStore.contacts.email,
      ZipCode: this.insuranceStore.contacts.address.postcode,
      HouseNumber: this.insuranceStore.contacts.address.number_extended.number_only.toString(),
      HouseNumberAddition: this.insuranceStore.contacts.address.number_extended.number_extension,
      IBAN: detailForm.value.iban,
      AgreeToFinalQuestions: 'J',
      HouseholdInsurances: [insurancePayload],
      HomeInsurances: null,
      CarInsurances: null

    } as PackagePremiumRequest;

    this.store$.dispatch(new packagePremiumActions.NewBuy(payload));
  }
}
