import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ConfigService } from '../../config.service';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';

import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models';


@Component({
  templateUrl: 'dashboard.component.html'
})
export  class DashboardComponent implements OnInit, AfterViewInit {
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  carInsurerLogoUrl: string;
  carInsurance: boolean;

  constructor(private profileService: ProfileService,
              private assistantService: AssistantService,
              private chatNotifierService: ChatStreamService) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = assistantService.config.avatar.title;
  }

  ngOnInit() {

    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
      });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;
        // Notify user via chatbot
        this.chatNotifierService.addTextMessage(this.chatConfig.dashboard.hoi(this.profile.firstname));

        // Get current insurances
        this.carInsurance = true;
        this.carInsurerLogoUrl = 'http://www.verzekeringadviseur.com/wp-content/uploads/2011/09/FBTO-logo.png';
      });
  }

  ngAfterViewInit() {
    return;
  }
}
