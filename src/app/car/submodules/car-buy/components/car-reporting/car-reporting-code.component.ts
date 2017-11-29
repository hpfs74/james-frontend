import { Component, OnInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { CarReportingCodeForm } from './car-reporting-code.form';
import { Profile } from '../../../../../profile/models';
import { CarInsurance } from '../../../../../car/models';
import { TagsService } from '../../../../../core/services/tags.service';
import { Tag } from '../../../../../core/models/tag';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { InsuranceAdvice } from '../../../../../insurance/models/index';

import * as FormUtils from '../../../../../utils/base-form.utils';
import * as fromRoot from '../../../../reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

const DEFAULT_FORM_VALUES = {
  accessoryValue: 0
};
@Component({
  selector: 'knx-car-reporting-code-form',
  templateUrl: 'car-reporting-code.component.html'
})
export class CarReportingCodeComponent implements OnInit, QaIdentifier, KNXStepRxComponent, OnDestroy {
  qaRootId = QaIdentifiers.carReporting;

  form: CarReportingCodeForm;
  insurance$: Observable<CarInsurance | InsuranceAdvice>;
  advice$: Observable<any>;
  selectedSecurityClass: Tag;
  securityClasses: Array<Tag>;
  subscription$: Subscription[] = [];
  constructor(private tagsService: TagsService,
              private store$: Store<fromRoot.State>) {

      this.securityClasses = this.tagsService.getByKey('buyflow_carsecurity');
      this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
      this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
      const formBuilder = new FormBuilder();
      this.form = new CarReportingCodeForm(formBuilder, this.tagsService.getAsLabelValue('buyflow_carsecurity'));
    }

    ngOnInit() {
      if (this.securityClasses) {
        this.form.formGroup.get('securityClass').valueChanges.subscribe((value) => {
          if (this.securityClasses instanceof Array) {
            this.selectedSecurityClass = this.securityClasses.filter(i => i.tag === value)[0];
          }
        });
      }
      this.setDefaultValues();
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

    /**
     * set default values to car-reporting-code.form fields
   */
  setDefaultValues() {
    Object.keys(DEFAULT_FORM_VALUES).forEach((key, value) => {
      this.form.formGroup.controls[key].setValue(value);
    });
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

    this.store$.dispatch(new advice.Update(this.form.formGroup.value));

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
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
