import { Component, OnInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { IbanForm } from '../../../../../shared/forms/iban.form';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import * as FormUtils from '../../../../../utils/base-form.utils';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'knx-car-payment-form',
  templateUrl: 'car-payment.component.html'
})
export class CarPaymentComponent implements OnInit, QaIdentifier, OnDestroy, KNXStepRxComponent {
  qaRootId = QaIdentifiers.carPayment;
  form: IbanForm;
  advice$: Observable<any>;
  subscription$: Subscription[] = [];
  constructor(private store$: Store<fromRoot.State>) {

    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    const formBuilder = new FormBuilder();
    this.form = new IbanForm(formBuilder);
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.payment', clear: true}));
    const startDate = this.form.formGroup.get('startDate');
    const currentDate = FormUtils.toDateFormat(new Date());
    startDate.setValue(currentDate);
    FormUtils.validateControls(this.form.formGroup, ['startDate']);
    this.subscription$.push(
      this.advice$.subscribe(advice => this.setAdvice(advice))
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
  }

  submitForm(): Observable<any> {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return Observable.throw(new Error(this.form.validationSummaryError));
    }

    this.store$.dispatch(new advice.Update(this.form.formGroup.value));

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
  }

  setAdvice(value: any) {
    if (value && value.startDate || value && value.iban) {
      this.form.formGroup.patchValue({
        startDate: FormUtils.toDateFormat(FormUtils.toDateType(value.startDate)),
        iban: value.iban
      });
      FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    }
  }
  onShow() {
    return Observable.empty();
  }
  onBack() {
    return Observable.empty();
  }
  onNext() {
    return this.submitForm();
  }
}
