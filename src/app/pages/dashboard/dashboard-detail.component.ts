import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'dashboard-detail.component.html',
})
export class DashboardDetailComponent implements OnInit, AfterViewInit {
  insuranceType: string;
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  constructor(private profileService: ProfileService,
              private assistantService: AssistantService,
              private chatNotifierService: ChatStreamService,
              private route: ActivatedRoute) {

    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {
    this.route.params.subscribe(x=> {
      this.insuranceType = x.insuranceType;
    });

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
    this.chatNotifierService
      .addTextMessage(this.chatConfig.dashboard.detail(this.insuranceType));
  }
}
