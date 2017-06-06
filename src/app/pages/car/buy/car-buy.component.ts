import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { KNXStepOptions, StepError } from '@knx/wizard';

import { ConfigService } from '../../../config.service';
import { AssistantService } from './../../../services/assistant.service';
import { AssistantConfig } from '../../../models/assistant';
import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../../components/knx-chat-stream/chat-stream.service';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from './../../../models/profile';
import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from './../../../forms/contact-detail.form';
import * as FormUtils from '../../../utils/base-form.utils';

@Component({
  templateUrl: 'car-buy.component.html'
})

export class CarBuyComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  currentStep: number;

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  assistantMessages: any;

  profile: Observable<Profile>;

  // Forms
  contactDetailForm: ContactDetailForm;

  constructor(
    private router: Router,
    private configService: ConfigService,
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
        onShowStep: () => this.initContactDetails(),
        onBeforeNext: this.submitContactDetails.bind(this)
      },
      {
        label: 'Autogegevens',
        nextButtonLabel: 'Naar justitie check',
        backButtonLabel: 'Terug'
      },
      {
        label: 'Check',
        nextButtonLabel: 'Naar betalingsgegevens',
        backButtonLabel: 'Terug'
      },
      {
        label: 'Betaling',
        nextButtonLabel: 'Aanvraging versturen',
        backButtonLabel: 'Terug'
      }
    ];

    let formBuilder = new FormBuilder();
    this.contactDetailForm = new ContactDetailForm(formBuilder);
  }

  initContactDetails() {
    this.profile = this.profileService.getUserProfile();
    this.chatNotifierService.addTextMessage(this.chatConfig.car.buy.contact);
  }

  submitContactDetails(): Observable<any> {
    FormUtils.validateForm(this.contactDetailForm.formGroup);

    if (!this.contactDetailForm.formGroup.valid) {
      return Observable.throw(new Error(this.contactDetailForm.validationSummaryError));
    }

    if (this.contactDetailForm.formGroup.get('saveToProfile').value) {
      return this.profileService.updateUserProfile(
        this.getUpdatedProfile(this.contactDetailForm.formGroup));
    }
  }

  onStepChange(event) {
    //TODO: implement
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
