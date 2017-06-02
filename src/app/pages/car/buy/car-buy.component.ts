import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { KNXStepOptions } from '@knx/wizard';

import { ConfigService } from '../../../config.service';
import { AssistantService } from './../../../services/assistant.service';
import { AssistantConfig } from '../../../models/assistant';
import { ChatMessage } from '../../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../../components/knx-chat-stream/chat-stream.service';
import { ProfileService } from '../../../services/profile.service';

import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from './../../../forms/contact-detail.form';

@Component({
  templateUrl: 'car-buy.component.html'
})

export class CarBuyComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  currentStep: number;

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  assistantMessages: any;

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
        label: 'Overzicht',
        nextButtonLabel: 'Naar contactgegevens',
        hideBackButton: true,
        //onShowStep: () => this.chatNotifierService.addTextMessage(this.chatConfig.car.welcome),
        //onBeforeNext: this.submitDetailForm.bind(this)
      },
      {
        label: 'Contactgegevens',
        nextButtonLabel: 'Naar autogegevens',
        backButtonLabel: 'Terug',
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

  onStepChange(event) {
    //TODO: implement
  }
}