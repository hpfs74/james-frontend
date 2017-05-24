import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';

@Component({
  template: `
    <div class="container knx-container-dashboard">
      <div class="row">
        <div class="col-md-8">
          <h2>Maak een keuze</h2>
          
        </div>
        <div class="col-md-4">
          <knx-chat-stream [options]="chatConfig" [messages]="chatMessages"></knx-chat-stream>
        </div>
      </div>
    </div>
  `
})
export class DashboardDetailComponent implements OnInit, AfterViewInit {
  insuranceType: string;
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  constructor(private profileService: ProfileService,
              private assistantService: AssistantService,
              private chatNotifierService: ChatStreamService) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {

    // TODO: get the insurance type parameter
    this.insuranceType = 'auto';

    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
      });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;

      });
  }

  ngAfterViewInit() {
    this.chatNotifierService.addTextMessage(`Wat wil je doen met je ${this.insuranceType} verzekering?`);
  }
}
