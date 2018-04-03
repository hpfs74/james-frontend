import { Component, OnInit } from '@angular/core';
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

@Component({
  providers: [AsyncPipe],
  selector: 'knx-house-hold-buy-details',
  templateUrl: './house-hold-buy-details.component.html',
  styleUrls: ['./house-hold-buy-details.component.scss'],
})
export class HouseHoldBuyDetailsComponent implements OnInit {
  houseInsurances: CalculatedPremium[];
  insurances: Array<InsuranceAdvice> = [];
  title: string;
  totalTitle: number;
  initialAmount = 4;
  disableInsuranceBuy: boolean;
  isPremiumsLoading$: Observable<boolean>;
  premiums$: Observable<HouseHoldPremiumResponse>;
  currentStepOptions: KNXWizardStepRxOptions;

  qaRootId = QaIdentifiers.carAdviceRoot;
  subscription$: Array<any>;
  form: HouseHoldDetailForm;
  addressForm: AddressForm;
  copies: any;
  error$: any;
  constructor(private store$: Store<fromRoot.State>,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private tagsService: TagsService) {

    this.getCompareResultCopy();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.premiums', clear: true}));
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
      const formBuilder = new FormBuilder();
      this.form = new HouseHoldDetailForm(formBuilder,
        this.tagsService.getAsLabelValue('car_flow_gender'),
        this.copies);
      this.addressForm = new AddressForm(formBuilder);
    });
    this.currentStepOptions = {
      label: 'Premiums list'
    };
    this.error$ = this.store$.select(fromCore.getWizardError);
    const formBuilder = new FormBuilder();
    this.currentStepOptions = {
      nextButtonLabel: this.copies['household.detail.next_step'],
      backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
    };
  }

  ngOnInit(): void {

    this.isPremiumsLoading$ = this.store$.select(fromHouse.getHouseHoldPremiumLoading);
    this.premiums$ = this.store$.select(fromHouse.getHouseHoldPremiumResult);

    this.premiums$
      .filter(data => data !== null)
      .subscribe((data) => {
        this.houseInsurances = data.CalculatedPremiums;
        if (this.houseInsurances) {
          this.insurances = this.houseInsurances.map(this.fromHouseToInsuranceAdvice);
        }
      });
  }

  trackInsurance(index, item): any {
    // return item && item.insurance ? item.insurance.id : undefined;
    return item && item.insurance_name;
  }

  selectInsurance(insurance: InsuranceAdvice): void {
    if (!this.houseInsurances) {
      return;
    }
    const houseInsurance = this.houseInsurances.filter((ins) => ins.Identifier === insurance.id)[0];
    this.store$.dispatch(new householddata.UpdateAdvice(houseInsurance));
    this.store$.dispatch(new wizardActions.Forward());
  }

  noResult(): boolean {
    return this.insurances.length <= 0 && !this.asyncPipe.transform(this.isPremiumsLoading$);
  }

  private getCompareResultCopy() {
    // This is needed because the ngrx-datatable modifies the result to add an $$index to each
    // result item and modifies the source array order when sorting
    // this.store$.select(getHouseHoldPremiumResult)
    //   .map(obs => {
    //     return obs.map(v => JSON.parse(JSON.stringify(v)));
    //   }).subscribe(insurances => {
    //   this.insurances = insurances;
    // });

    // this.store$.select(fromInsurance.getSelectedAdvice)
    //   .filter(advice => advice !== undefined && Object.keys(advice).length > 1) // bit hackisch way to check for valid compare request
    //   .subscribe(advice => {
    //     this.store$.dispatch(new compare.LoadCarAction(advice));
    //   });
  }

  fromHouseToInsuranceAdvice(source: CalculatedPremium): InsuranceAdvice {
    if (!source) {
      return null;
    }

    return {
      id: source.Identifier,
      logo: source.CompanyLogoUrl,
      price: source.InsuredAmount,
      own_risk: source.Deductables,
      monthly_premium: source.Premium,
      advice_expires_at: Date.now(),
      insurance_id: source.CompanyName,
      insurance_name: source.CompanyName,
      details: source.PackageDescription,

      supported: true
    };
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

