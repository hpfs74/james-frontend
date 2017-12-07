import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { Profile } from './../../../../../profile/models';
import { ContactDetailForm } from './../../../../../shared/forms/contact-detail.form';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Subscription } from 'rxjs/Subscription';

import * as FormUtils from '../../../../../utils/base-form.utils';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as router from '../../../../../core/actions/router';
import * as car from '../../../../../car/actions/car';
import * as advice from '../../../../../insurance/actions/advice';
import * as compare from '../../../../../car/actions/compare';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';


@Component({
  selector: 'knx-car-contact-form',
  styleUrls: ['./car-contact.component.scss'],
  templateUrl: 'car-contact.component.html'
})
export class CarContactComponent implements QaIdentifier, AfterContentInit, OnDestroy {
  qaRootId = QaIdentifiers.carContact;
  advice$: Observable<any>;
  form: ContactDetailForm;
  subscription$: Subscription[] = [];
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  constructor(private store$: Store<fromRoot.State>) {
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    const formBuilder = new FormBuilder();
    this.form = new ContactDetailForm(formBuilder);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Contactgegevens',
      nextButtonLabel: 'Naar autogegevens',
      backButtonLabel: 'Terug',
      hideBackButton: true,
    };
  }

  setAdvice(value: any) {
    FormUtils.updateAndValidateControls(this.form.formGroup, value);
  }

  ngAfterContentInit() {
    this.subscription$.push(
      this.advice$.subscribe(advice => this.setAdvice(advice))
    );
    this.initFormWithProfile();
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe);
  }

  initFormWithProfile() {
    this.store$.dispatch(new assistant.ClearAction);
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.fill'}));
  }

  resetAdvice() {
    this.store$.dispatch(new advice.Reset());
    this.store$.dispatch(new compare.CarCompareResetStateAction());
    this.store$.dispatch(new car.CarResetStateAction());
    this.store$.dispatch(new router.Go({path: ['car']}));
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    FormUtils.validateControls(this.form.formGroup, Object.keys(this.form.formGroup.controls));
    if (!this.form.formGroup.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }
    this.store$.dispatch(new advice.Update(this.form.formGroup.value));
    this.store$.dispatch(new wizardActions.Forward());
  }
}
