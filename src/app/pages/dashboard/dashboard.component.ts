import { Component, OnInit } from '@angular/core';
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
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <h2>Je verzekeringen</h2>
              <knx-button-icon label="Auto" routerLink="/car">
                <img class="knx-button-icon__icon" src="/assets/images/icon-car.svg">
              </knx-button-icon>

              <knx-button-icon label="Reis">
                <img class="knx-button-icon__icon" src="/assets/images/icon-travel.svg">
              </knx-button-icon>

              <knx-button-icon label="Inboedel" isPlaceholder="true">
                <img class="knx-button-icon__icon" src="/assets/images/icon-content.svg">
              </knx-button-icon>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 col-sm-12">
              <knx-button-icon label="Opstal" isPlaceholder="true">
                <img class="knx-button-icon__icon" src="/assets/images/icon-home.svg">
              </knx-button-icon>

              <knx-button-icon label="Aansprakelijkheid" isPlaceholder="true">
                <img class="knx-button-icon__icon" src="/assets/images/icon-liability.svg">
              </knx-button-icon>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <knx-chat-stream [options]="chatConfig" [messages]="chatMessages"></knx-chat-stream>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  constructor(
    private profileService: ProfileService,
    private assistantService: AssistantService,
    private chatNotifierService: ChatStreamService
  ) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {
    return;
  }
}
