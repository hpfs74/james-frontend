import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { KNXStepOptions, StepError } from '@knx/wizard';

import * as fromRoot from '../../../reducers';
import * as assistant from '../../../actions/assistant';

import { ConfigService } from '../../../config.service';
import { ContentService } from '../../../content.service';
import { AssistantService } from './../../../services/assistant.service';
import { AssistantConfig } from '../../../models/assistant';
import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from './../../../models/profile';

import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from './../../../forms/contact-detail.form';

import { CarReportingCodeComponent } from './car-info.component';
import { CarReportingCodeForm } from './car-reporting-code.form';
import { CarCheckComponent } from './car-check.component';
import { CarCheckForm } from './car-check.form';

import { CarPaymentComponent } from './car-payment.component';
import { IbanForm } from '../../../forms/iban.form';

import { BaseForm } from '../../../forms/base-form';
import * as FormUtils from '../../../utils/base-form.utils';

import { mockCar } from '../../../models/_mocks/car.mock';

@Component({
  templateUrl: 'car-buy.component.html'
})
export class CarBuyComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  formContent: any;
  currentStep: number;

  chatConfig: AssistantConfig;
  chatMessages$: Observable<Array<ChatMessage>>;

  profile$: Observable<Profile>;

  // Forms
  contactDetailForm: ContactDetailForm;
  reportingCodeForm: CarReportingCodeForm;
  checkForm: CarCheckForm;
  paymentForm: IbanForm;
  acceptFinalTerms: boolean;
  formData: any;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private configService: ConfigService,
    private contentService: ContentService,
    private assistantService: AssistantService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.chatConfig = this.assistantService.config;
    this.chatConfig.avatar.title = 'Expert autoverzekeringen';
    this.chatMessages$ = this.store.select(fromRoot.getAssistantMessageState);

    let formBuilder = new FormBuilder();
    this.formContent = this.contentService.getContentObject();

    this.contactDetailForm = new ContactDetailForm(formBuilder);
    this.reportingCodeForm = new CarReportingCodeForm(formBuilder, this.formContent.car.securityClass);
    this.checkForm = new CarCheckForm(formBuilder);
    this.paymentForm = new IbanForm(formBuilder);

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Contactgegevens',
        nextButtonLabel: 'Naar autogegevens',
        backButtonLabel: 'Terug',
        hideBackButton: true,
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitForm.bind(this, this.contactDetailForm)
      },
      {
        label: 'Autogegevens',
        nextButtonLabel: 'Naar check',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitForm.bind(this, this.reportingCodeForm)
      },
      {
        label: 'Check',
        nextButtonLabel: 'Naar betalingsgegevens',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initForm(this.chatConfig.car.buy.check),
        onBeforeNext: this.submitForm.bind(this, this.checkForm)
      },
      {
        label: 'Betaling',
        nextButtonLabel: 'Naar overzicht',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initForm(this.chatConfig.car.buy.payment),
        onBeforeNext: this.submitForm.bind(this, this.paymentForm)
      },
      {
        label: 'Overzicht',
        nextButtonLabel: 'Verzekering aanvragen',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initSummaryForm(this.chatConfig.car.buy.summary),
        onBeforeNext: this.submitInsurance.bind(this)
      }
    ];
  }

  initFormWithProfile() {
    FormUtils.scrollToForm('form');

    this.profile$ = this.store.select(fromRoot.getProfile);

    this.store.dispatch(new assistant.ClearAction);
    this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.car.buy.fill));
  }

  initForm(message: string) {
    FormUtils.scrollToForm('form');
    this.store.dispatch(new assistant.ClearAction);
    this.store.dispatch(new assistant.AddMessageAction(message));
  }

  initSummaryForm(message: string) {
    this.initForm(message);

    // Collect all form data
    let forms = [
      this.contactDetailForm.formGroup.value,
      this.reportingCodeForm.formGroup.value,
      this.checkForm.formGroup.value,
      this.paymentForm.formGroup.value
    ];

    let data = forms.reduce((acc, x) => {
      for (let key in x) {
        acc[key] = x[key];
      }
      return acc;
    }, {});

    console.log(data);
    this.formData = data;
  }

  submitForm(form: BaseForm) {
    // FormUtils.validateForm(form.formGroup);
    // if (!form.formGroup.valid) {
    //   return Observable.throw(new Error(form.validationSummaryError));
    // }

    // let saveCtrl = form.formGroup.get('saveToProfile');
    // if (saveCtrl && saveCtrl.value) {
    //   return this.profileService.updateUserProfile(
    //     this.getUpdatedProfile(form.formGroup));
    // }

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
  }

  submitInsurance(): Observable<any> {
    console.log(this.acceptFinalTerms);

    // Final insurance request submit
    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  private getUpdatedProfile(form: FormGroup) {
    return {
      firstname: form.value.firstName,
      infix: form.value.middleName,
      lastname: form.value.lastName,
      phone: form.value.mobileNumber || form.value.phone
    };
  }
}
