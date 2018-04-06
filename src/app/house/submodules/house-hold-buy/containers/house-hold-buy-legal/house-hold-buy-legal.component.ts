import { Component } from '@angular/core';
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

@Component({
  selector: 'knx-house-hold-buy-legal',
  templateUrl: 'house-hold-buy-legal.component.html'
})
export class HouseHoldBuyLegalComponent implements QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldBuyLegal;
  form: HouseHoldBuyLegalForm;
  advice$: Observable<any>;
  subscription$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  copies: any = {};
  constructor(private store$: Store<fromRoot.State>,
              private translateService: TranslateService) {

    this.translateService.get([
      'household.legal.q1',
      'household.legal.q2',
      'household.legal.q3',
      'household.legal.q4',
      'household.legal.q5',
      'household.legal.q6',
      'household.legal.q7',
      'household.legal.q1.error',
      'household.legal.q2.error',
      'household.legal.q3.error',
      'household.legal.q4.error',
      'household.legal.q5.error',
      'household.legal.q6.error',
      'household.legal.q7.error',
      'household.legal.next_step',
      'household.common.step.options.backButtonLabel'
    ])
    .subscribe(values => this.copies = values);
    this.error$ = this.store$.select(fromCore.getWizardError);
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldBuyLegalForm(formBuilder, this.copies);
    this.currentStepOptions = {
      nextButtonLabel: this.copies['household.legal.next_step'],
      backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
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
    const legalQuestions: LegalQuestions = {
      question1: true,
      question2: true,
      question3: true,
      question4: true,
      question5: true,
      question6: true,
      question7: true,
    };
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
      });
  }
}
