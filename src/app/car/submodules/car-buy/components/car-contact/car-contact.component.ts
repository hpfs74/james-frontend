import { Component } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';

import { Profile } from './../../../../../profile/models';
import { ContactDetailForm } from './../../../../../shared/forms/contact-detail.form';
import * as FormUtils from '../../../../../utils/base-form.utils';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as router from '../../../../../core/actions/router';
import * as car from '../../../../../car/actions/car';
import * as advice from '../../../../../insurance/actions/advice';
import * as compare from '../../../../../car/actions/compare';
import { AfterContentInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'knx-car-contact-form',
  styleUrls: ['./car-contact.component.scss'],
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements QaIdentifier, AfterContentInit, KNXStepRxComponent, OnDestroy {
  qaRootId = QaIdentifiers.carContact;
  advice$: Observable<any>;
  form: ContactDetailForm;
  subscription$: Subscription[] = [];

  constructor(private store$: Store<fromRoot.State>) {
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    const formBuilder = new FormBuilder();
    this.form = new ContactDetailForm(formBuilder);
  }

  setAdvice(value: any) {
    FormUtils.updateAndValidateControls(this.form.formGroup, value);
  }

  ngAfterContentInit() {
    this.subscription$.push(
      this.advice$.subscribe(advice => this.setAdvice(advice))
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe);
  }

  initFormWithProfile() {
    this.store$.dispatch(new assistant.ClearAction);
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.fill'}));
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

  resetAdvice() {
    this.store$.dispatch(new advice.ResetAction());
    this.store$.dispatch(new compare.CarCompareResetStateAction());
    this.store$.dispatch(new car.CarResetStateAction());
    this.store$.dispatch(new router.Go({path: ['car']}));
  }

  onBack() {
    return Observable.empty();
  }
  onNext(): Observable<any> {
    return this.submitForm();
  }
  onShow() {
    this.initFormWithProfile();
    return Observable.empty();
  }
}
