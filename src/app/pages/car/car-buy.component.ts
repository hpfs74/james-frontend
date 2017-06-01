import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { KNXStepOptions } from '@knx/wizard';

import { ConfigService } from '../../config.service';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  templateUrl: 'car-buy.component.html'
})

export class CarBuyComponent implements OnInit {
  formSteps: Array<KNXStepOptions>;
  currentStep: number;

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  assistantMessages: any;

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
        label: 'Gekozen verzekering',
        nextButtonLabel: 'Naar contactgegevens',
        hideBackButton: true,
        //onShowStep: () => this.chatNotifierService.addTextMessage(this.chatConfig.car.welcome),
        //onBeforeNext: this.submitDetailForm.bind(this)
      },
      {
        label: 'Contactgegevens',
        backButtonLabel: 'Terug',
      },
      {
        label: 'Autogegevens',
        backButtonLabel: 'Terug'
      },
      {
        label: 'Check',
        backButtonLabel: 'Terug'
      },
      {
        label: 'Betaling',
        backButtonLabel: 'Terug'
      }
    ];


   }

  onStepChange(event) {
    //TODO: implement
  }
}
