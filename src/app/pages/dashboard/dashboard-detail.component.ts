import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AssistantService } from '../../services/assistant.service';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AssistantConfig } from './../../models/assistant';
import { ChatMessage } from './../../components/knx-chat-stream/chat-message';
import { Profile } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { insuranceTypes } from './../../models/insurance-map';

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
export class DashboardDetailComponent implements OnInit, AfterViewInit {
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
    this.route.params.subscribe(params => {
      this.insuranceType = params['type'];
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
      .addTextMessage(this.chatConfig.dashboard.detail(this.getInsuranceLabel(this.insuranceType)));
  }

  goToAdvice() {
    this.router.navigate([this.insuranceType]);
  }

  goToCompare() {
    //TODO: implement
    this.router.navigate(['/']);
  }

  private getInsuranceLabel(type: string) {
    return insuranceTypes.filter(obj => obj.type === type)[0].apiType;
  }
}
