import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { HouseHoldBuyLegalForm } from '@app/house/submodules/house-hold-buy/containers/house-hold-buy-legal/house-hold-buy-legal.form';
import { TranslateService } from '@ngx-translate/core';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromCore from '@app/core/reducers';
import * as fromHouseHold from '@app/house/reducers';
import * as householddataActions from '@app/house/actions/house-hold-data';
import { InsuranceStore, LegalQuestions } from '@app/house/models/house-hold-store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'knx-house-hold-buy-legal',
  templateUrl: 'house-hold-buy-legal.component.html'
})
export class HouseHoldBuyLegalComponent implements QaIdentifier, OnDestroy, OnInit {
  qaRootId = QaIdentifiers.houseHoldBuyLegal;
  form: HouseHoldBuyLegalForm;
  subscription$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  copies: any = {};
  params: any = {};

  constructor(private store$: Store<fromRoot.State>,
              private translateService: TranslateService) {

    this.translateService.get([
      'household.legal.q1',
      'household.legal.q2',
      'household.legal.q3',
      'household.legal.q4',
      'household.legal.q5',
      'household.legal.q6',
      'household.legal.q1.error',
      'household.legal.q2.error',
      'household.legal.q3.error',
      'household.legal.q4.error',
      'household.legal.q5.error',
      'household.legal.q6.error',
      'household.legal.next_step',
      'household.legal.go_back',
      'household.legal.error'
    ])
      .subscribe(values => this.copies = values);
    this.error$ = this.store$.select(fromCore.getWizardError);
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldBuyLegalForm(formBuilder, this.copies);
    this.currentStepOptions = {
      nextButtonLabel: this.copies['household.legal.next_step'],
      backButtonLabel: this.copies['household.legal.go_back'],
    };
  }

  ngOnInit() {
    this.subscription$.push(
      this.store$.select(fromHouseHold.getNewFlowAdviceSelectedHouseHoldPremium)
        .subscribe(x => {
          this.params.InsuranceCompanyName = x.CompanyName;
        }),
      this.store$.select(fromHouseHold.getHouseHoldNewFlowAdvice)
        .filter(householdNewFlowData => !!householdNewFlowData.questions)
        .subscribe(householdNewFlowData => {
          const formData = {
            refuse: householdNewFlowData.questions.question1,
            crime: householdNewFlowData.questions.question2,
            harmed: householdNewFlowData.questions.question3,
            bankrupt: householdNewFlowData.questions.question4,
            fraud: householdNewFlowData.questions.question5,
            seizedIncome: householdNewFlowData.questions.question6,
          };
          this.form.formGroup.patchValue(Object.assign({}, formData));
        })
    );
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    const legalQuestions: LegalQuestions = {
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      question6: false
    };
    this.subscription$.push(
      this.store$.select(fromHouseHold.getHouseHoldNewFlowAdvice)
        .take(1)
        .subscribe((newFlowAdvice: InsuranceStore) => {
          const insuranceStore = Object.assign(
            {},
            newFlowAdvice,
            {
              questions: Object.assign({}, legalQuestions)
            });
          this.store$.dispatch(new householddataActions.NewFlowAdviceStore(insuranceStore));
          this.store$.dispatch(new wizardActions.Forward());
        })
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
