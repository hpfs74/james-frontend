import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as router from '@app/core/actions/router';
import * as car from '@app/car/actions/car';
import * as advice from '@app/insurance/actions/advice';
import * as insurance from '@app/insurance/actions/insurance';
import * as compare from '@app/car/actions/compare';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as auth from '@app/auth/actions/auth';
import * as fromProfile from '@app/profile/reducers';
import * as profileActions from '@app/profile/actions/profile';

import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { Profile } from '@app/profile/models';
import { ContactDetailForm } from '@app/shared/forms/contact-detail.form';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Insurance, InsuranceAdvice } from '@app/insurance/models';
import { SharedService } from '@app/shared/services/shared.service';

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
  profile$: Observable<any>;
  isLoggedIn: boolean;
  selectedInsurance$: Observable<Insurance | InsuranceAdvice>;
  constructor(private store$: Store<fromRoot.State>,
              public sharedService: SharedService) {
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.selectedInsurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.store$.select(fromAuth.getLoggedIn).take(1).subscribe(loggedIn => this.isLoggedIn = loggedIn);
    const formBuilder = new FormBuilder();
    this.form = new ContactDetailForm(formBuilder);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.profile$ = this.store$.select(fromProfile.getProfile);
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
    this.store$.dispatch(new insurance.SaveLatest());
    this.initFormWithProfile();
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe);
  }

  initFormWithProfile() {
    this.store$.dispatch(new assistant.ClearAction);
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.fill'}));
  }

  resetFlow() {
    this.sharedService.tempVariables.set('carFlow', true);
    this.store$.dispatch(new advice.RemoveLatestInsuranceAdvice());
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
