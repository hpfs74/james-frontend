import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactDetails, InsuranceStore } from '@app/house/models/house-hold-store';
import { Observable } from 'rxjs/Observable';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import * as fromHouseHold from '@app/house/reducers';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/observable/of';
import { HouseHoldPaymentDetailsForm } from './house-hold-payment-details.form';
import { FormBuilder } from '@angular/forms';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Subscription } from 'rxjs/Subscription';
import * as wizardActions from '@core/actions/wizard';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import * as FormUtils from '@utils/base-form.utils';

const fakedata = {
  houseHoldInsurance: {
    selectedPremium: {
      CommencingDate: '2018-01-11T00:00:00',
      NettoPremium: 17.93,
      TotalCosts: 1.25,
      Taxes: 4.03,
      Premium: 23.21,
      PaymentPeriod: 1,
      PackageDescription: 'Totaal Plan',
      ProductDescription: 'Inboedel',
      CompanyName: 'Reaal',
      CompanyLogoUrl: 'https://webmodulea.risk-verzekeringen.nl/Webmodule/IMG/Maatschappijen/H043_Small.png',
      Identifier: '84985H043P0560007',
      ConditionUrls: [
        {
          URL: 'xxxx',
          Description: 'Voorwaarden Woonpakket',
          Number: 'WP 16-01'
        },
        {
          URL: 'xxx',
          Description: 'Bijzondere Voorwaarden Buitenshuisdekking',
          Number: 'Bui 0807'
        }
      ],
      Clauses: [
        {
          ClauseTitle: 'Geen beroep op onderverzekering (inboedel)',
          ClauseNumber: '3413',
          ClauseText: 'REAAL zal geen beroep doen op onderverzekering indien de waarde...'
        }
      ],
      HouseholdCoverageDescription: 'Alle gevaren',
      InsuredAmount: 4215600,
      Deductables: 50,
      TenantsInterestCoverageDescription: null,
      GlassCoverageDescription: 'Glas',
      ValuablesCoverageDescription: 'Buitenshuis Particulier inclusief laptop',
      ValuablesInsuredAmount: 5000
    }
  },
  houseInsurance: null,
  contacts: {
    lastName: 'Skywalker',
    infix: 'van',
    prefix: 'S.A.',
    firstName: 'Sarah',
    dateOfBirth: new Date('1/1/1990'),
    familySituation: 'A',
    address: {
      street: 'street name',
      number: '123',
      postcode: '2717AX',
      city: 'sophia'
    },
    addressForComminications: null,
    email: 's.skywalker@empire.com'
  }

} as InsuranceStore;

@Component({
  selector: 'knx-house-hold-payment-details',
  templateUrl: './house-hold-payment-details.component.html'
})
export class HouseHoldPaymentDetailsComponent implements OnInit, OnDestroy {
  contact$: Observable<ContactDetails>;
  selectedInsurances$: Observable<CalculatedPremium[]>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  form: HouseHoldPaymentDetailsForm;
  copies: any;
  subscriptions: Subscription[] = [];

  constructor(private store$: Store<fromRoot.State>,
              private translateService: TranslateService) {

    const formBuilder = new FormBuilder();

    this.subscriptions.push(this.translateService.get([
      'general.errors.field_is_required',
      'general.errors.iban_is_invalid',
      'household.payment_details.payment_details.title',
      'household.payment_details.step.options.back_button.label',
      'household.payment_details.step.options.next_button.label',
      'household.payment_details.iban.placeholder',
      'household.payment_details.iban.label',
      'household.payment_details.knabtac.label',
      'household.payment_details.risktac.label'
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

    this.contact$ = Observable.of(fakedata.contacts);

    this.selectedInsurances$ = Observable.of([fakedata.houseHoldInsurance.selectedPremium]);

    this.setInitialSubscriptions();
  }

  /** ondestroy unsubscribe all */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /** set component initial subscription */
  setInitialSubscriptions() {

    // this.subscriptions.push(
    //  this.store$.insuranceBuy.subscribe( res=> {
    //     // go to the next step
    //     this.store$.dispatch(new wizardActions.Forward());});
    // );
  }

  /** handle the going to previous step */
  goToPrevStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  /** check form status and goes to the next step */
  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    // add code to save in store with the package
    this.store$.dispatch(new houseHoldData.NewFlowAdviceStore({
      paymentDetails: {
        iban: detailForm.value.iban
      }
    }));

    this.store$.dispatch(new wizardActions.Forward());
  }
}
