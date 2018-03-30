import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { CarCheckForm } from './car-check.form';
import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as advice from '@app/insurance/actions/advice';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';


@Component({
  selector: 'knx-house-hold-premiums-legal',
  templateUrl: 'house-hold-premiums-legal.component.html'
})
export class HouseHoldPremiumsLegalComponent implements OnInit, QaIdentifier, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldPremiumLegal;
  form: CarCheckForm;
  advice$: Observable<any>;
  subscription$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  constructor(private store$: Store<fromRoot.State>) {

    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.error$ = this.store$.select(fromCore.getWizardError);
    const formBuilder = new FormBuilder();
    this.form = new CarCheckForm(formBuilder);
    this.currentStepOptions = {
      label: 'Check',
      nextButtonLabel: 'Naar betalingsgegevens',
      backButtonLabel: 'Terug',
    };
  }

  ngOnInit() {
    // bind comment text areas to radio button value
    this.initCheckForm('car.buy.check');
    this.form.formGroup.get('crime').valueChanges.subscribe(val => this.toggleTextArea('crimeComment', val));
    this.form.formGroup.get('debt').valueChanges.subscribe(val => this.toggleTextArea('debtComment', val));
    this.form.formGroup.get('refuse').valueChanges.subscribe(val => this.toggleTextArea('refuseComment', val));
    this.form.formGroup.get('driver').valueChanges.subscribe(val => this.toggleTextArea('driverComment', val));
    this.form.formGroup.get('cause').valueChanges.subscribe(val => this.toggleTextArea('causeComment', val));
    this.form.formGroup.get('register').valueChanges.subscribe(val => this.toggleTextArea('registerComment', val));
    this.subscription$.push(
      this.advice$.subscribe(advice => this.setAdvice(advice))
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
  }

  /* istanbul ignore next */
  setAdvice(value: any) {
    if (value) {
      FormUtils.updateAndValidateControls(this.form.formGroup, value);
    }
  }

  toggleTextArea(textAreaControlName: string, value: boolean) {
    let textArea = this.form.formGroup.get(textAreaControlName);
    if (value) {
      textArea.setValidators(Validators.required);
    } else {
      textArea.clearValidators();
      textArea.markAsPristine();
      textArea.markAsUntouched();
    }
    textArea.updateValueAndValidity();
  }

  /* istanbul ignore next */
  initCheckForm(messageKey: string) {
    this.store$.select(fromInsurance.getSelectedInsurance)
      .filter(insurance => insurance != null)
      .subscribe((insurance) => {
        const insuranceName = insurance._embedded.insurance.insurance_brand || null;
        if (insuranceName) {
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: messageKey,
            value: insuranceName,
            clear: true
          }));
        }
      });
  }

  /* istanbul ignore next */
  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  /* istanbul ignore next */
  goToNextStep() {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    this.store$.dispatch(new advice.Update(this.form.formGroup.value));
    this.store$.dispatch(new wizardActions.Forward());
  }
}
