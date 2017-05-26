import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';

@Component({
  templateUrl: 'dashboard.component.html'
})
export  class DashboardComponent implements OnInit, AfterViewInit {
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

    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
      });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;
        this.chatNotifierService.addTextMessage(`Hoi ${this.profile.firstname}, ik ben je persoonlijke verzekeringsassistent. Met welke verzekering kan ik je vandaag helpen?`);
      });

    return;
  }

  ngAfterViewInit() {

  }
}
