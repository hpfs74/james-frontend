import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { ChatStreamComponent } from './../../components/knx-chat-stream/chat-stream.component';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { insuranceTypes } from './../../models/';

@Component({
  template: `
  <div class="knx-dashboard-detail">
    <button class="knx-button knx-button--pill" (click)="goToAdvice()">
      <span class="knx-icon-calculator"></span> Advies en vergelijken
    </button>
    <button class="knx-button knx-button--pill" [disabled]="true" (click)="goToCompare()">
      <span class="knx-icon-money"></span> Huidige verzekering invullen
    </button>
  </div>
  `,
  styles: [`
    .knx-dashboard-detail { margin-bottom: 20px }
  `]
})
export class DashboardDetailComponent implements OnInit {
  @ViewChild(ChatStreamComponent) chatStreamComponent: ChatStreamComponent;

  insuranceType: string;
  label: string;
  message: string;
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];

  constructor(private router: Router,
    private profileService: ProfileService,
    private assistantService: AssistantService,
    private chatNotifierService: ChatStreamService,
    private route: ActivatedRoute) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {
    this.chatNotifierService.addMessage$.subscribe(
      (message) => {
        this.chatMessages = [message];
      });

    this.route.params.subscribe(params => {
      this.insuranceType = params['type'];
      this.chatNotifierService
          .addTextMessage(this.chatConfig.dashboard.detail(this.getInsuranceLabel(this.insuranceType)), true);
    });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;
      });
  }

  goToAdvice() {
    this.router.navigate([this.insuranceType]);
  }

  goToCompare() {
    //TODO: implement
    this.router.navigate(['/']);
  }

  private getInsuranceLabel(type: string) {
    return insuranceTypes.filter(obj => obj.type === type)[0].label.toLocaleLowerCase();
  }
}
