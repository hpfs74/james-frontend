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
import { Profile, InsuranceMap, DashboardItem, insuranceTypes } from '../../models';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  profile: Profile;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  insurances: Array<DashboardItem>;

  constructor(private router: Router,
    private profileService: ProfileService,
    private assistantService: AssistantService,
    private chatNotifierService: ChatStreamService) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
  }

  ngOnInit() {
    this.chatNotifierService.addMessage$.subscribe(
      message => {
        this.chatMessages = [message];
      });

    this.profileService.getUserProfile()
      .subscribe(x => {
        this.profile = x;
        this.chatNotifierService.addTextMessage(this.chatConfig.dashboard.welcome(this.profile.firstname));

        let myInsurances = this.profile._embedded.insurance.documents
          .map((obj) => {
            return Object.assign(obj, {
              insuranceType: this.getInsuranceType(obj.type)
            });
          });
        if (this.insurances) {
          this.insurances = myInsurances.concat(this.createRemainingInsurances(insuranceTypes, myInsurances));
        } else {
          this.insurances = insuranceTypes.map((s) => {
            return {
              insuranceType: s.type,
              type: s.apiType
            };
          });
        }
      });
  }

  goToActions(type: string) {
    console.log(type);
    this.router.navigate(['/next-action', type]);
  }

  private createRemainingInsurances(validTypes: Array<InsuranceMap>, items: Array<any>): Array<any> {
    return validTypes
      .filter(i => items.filter(pi => pi.insuranceType !== i.type).length > 0)
      .map((s) => {
        return {
          insuranceType: s.type,
          type: s.apiType
        };
      });
  }

  private getInsuranceLabel(type: string) {
    return insuranceTypes.filter(obj => obj.type === type)[0].apiType;
  }

  private getInsuranceType(apiType: string) {
    return insuranceTypes.filter(obj => obj.apiType === apiType)[0].type;
  }
}
