import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { KNXStepOptions, StepError } from '@knx/wizard';

import { ConfigService } from '../../../config.service';
import { ContentService } from '../../../content.service';
import { AssistantService } from './../../../services/assistant.service';
import { AssistantConfig } from '../../../models/assistant';
import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../../components/knx-chat-stream/chat-stream.service';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from './../../../models/profile';

import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from './../../../forms/contact-detail.form';

import { CarReportingCodeComponent } from './car-info.component';
import { CarReportingCodeForm } from './car-reporting-code.form';

import { mockCar } from '../../../models/_mocks/car.mock';

import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  templateUrl: 'car-buy.component.html'
})
export class CarBuyComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  formContent: any;
  currentStep: number;

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  profile: Observable<Profile>;

  // Forms
  contactDetailForm: ContactDetailForm;
  reportingCodeForm: CarReportingCodeForm;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private contentService: ContentService,
    private assistantService: AssistantService,
    private chatNotifierService: ChatStreamService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
      });

    this.chatConfig = this.assistantService.config;
    this.chatConfig.avatar.title = 'Expert autoverzekeringen';

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Contactgegevens',
        nextButtonLabel: 'Naar autogegevens',
        backButtonLabel: 'Terug',
        hideBackButton: true,
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitContactDetails.bind(this)
      },
      {
        label: 'Autogegevens',
        nextButtonLabel: 'Naar check',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitReportingCode.bind(this)
      },
      {
        label: 'Check',
        nextButtonLabel: 'Naar betalingsgegevens',
        backButtonLabel: 'Terug'
      },
      {
        label: 'Betaling',
        nextButtonLabel: 'Aanvraag versturen',
        backButtonLabel: 'Terug'
      }
    ];

    let formBuilder = new FormBuilder();
    this.formContent = this.contentService.getContentObject();

    this.contactDetailForm = new ContactDetailForm(formBuilder);
    this.reportingCodeForm = new CarReportingCodeForm(formBuilder, this.formContent.car.securityClass);
    this.reportingCodeForm.infoMessages = {
      reportingCode: this.chatConfig.car.buy.info.reportingCode
    };
  }

  initFormWithProfile() {
    FormUtils.scrollToForm('form');

    // TODO: replace mock data with actual
    this.profile = this.profileService.getUserProfile()
      .map((profile) => {
        let p = profile;
        p._embedded.car = Object.assign(mockCar, {
          count: 0,
          limit: 10,
          offset: 0
        });
        return p;
      });

    this.chatNotifierService.addTextMessage(this.chatConfig.car.buy.fill);
  }

  submitContactDetails(): Observable<any> {
    // FormUtils.validateForm(this.contactDetailForm.formGroup);

    // if (!this.contactDetailForm.formGroup.valid) {
    //   return Observable.throw(new Error(this.contactDetailForm.validationSummaryError));
    // }

    // if (this.contactDetailForm.formGroup.get('saveToProfile').value) {
    //   return this.profileService.updateUserProfile(
    //     this.getUpdatedProfile(this.contactDetailForm.formGroup));
    // }

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
  }

  submitReportingCode(): Observable<any> {
    //TODO: implement
    //console.log(this.reportingCodeForm.formGroup.value);
    return Observable.throw(new Error(this.reportingCodeForm.validationSummaryError));
  }

  onStepChange(event) {
    // TODO: implement properly
    this.currentStep += 1;
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
