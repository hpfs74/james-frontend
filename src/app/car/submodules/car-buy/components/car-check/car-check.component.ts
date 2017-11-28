import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CarCheckForm } from './car-check.form';
import * as FormUtils from '../../../../../utils/base-form.utils';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';

@Component({
  selector: 'knx-car-check',
  templateUrl: 'car-check.component.html'
})
export class CarCheckComponent implements OnInit, QaIdentifier, KNXStepRxComponent, OnDestroy {
  qaRootId = QaIdentifiers.carCheck;
  form: CarCheckForm;
  advice$: Observable<any>;
  subscription$: Subscription[] = [];
  constructor(private store$: Store<fromRoot.State>) {

    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    const formBuilder = new FormBuilder();
    this.form = new CarCheckForm(formBuilder);
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

  submitForm(): Observable<any> {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return Observable.throw(new Error(this.form.validationSummaryError));
    }

    this.store$.dispatch(new advice.UpdateAction(this.form.formGroup.value));

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
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
