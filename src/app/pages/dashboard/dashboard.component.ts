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
import { Profile, ProfileEmbedded, DashboardInsuranceMap, DashboardItem, insuranceTypes } from '../../models';

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

        let embeddedItems = this.profile._embedded;
        let insuranceItems = Object.keys(insuranceTypes).map((i) => insuranceTypes[i].type);

        let myInsurances = [];
        Object.keys(this.profile._embedded)
          .filter((key) => insuranceItems.indexOf(key) !== -1)
          .forEach((key) => {
            this.profile._embedded[key].documents.forEach(element => {
              myInsurances.push(Object.assign(element, {
                type: key,
                label: this.getInsuranceLabel(key)
              }));
            });
          });

        if (myInsurances) {
          this.insurances = myInsurances.concat(this.getRemainingInsurances(insuranceTypes, myInsurances));
        } else {
          //TODO: also add default insurances if getUserProfile call fails or show error
          this.insurances = insuranceTypes.map((s) => {
            return {
              type: s.type,
              label: s.label
            };
          });
        }
      });
  }

  goToActions(type: string) {
    this.router.navigate(['/go', type]);
  }

  // TODO: merge in insurance property documents into specific insurance type
  // private extractInsuranceDocuments(embeddedItem: ProfileEmbedded) {
  //   let types = Object.keys(insuranceTypes).map((i) => insuranceTypes[i].type);
  //   let labels = Object.keys(insuranceTypes).map((i) => insuranceTypes[i].label);

  //   let contains = (arr, i) => arr.indexOf(i) !== -1;
  //   let isLabelType = (item) => contains(labels, item);
  //   let isDefaultType = (item) => contains(types, item);

  //   embeddedItem.documents.forEach((doc) => {

  //   });
  // }

  private getRemainingInsurances(validTypes: Array<DashboardInsuranceMap>, items: Array<any>): Array<any> {
    return validTypes
      .filter(i => items.filter(pi => pi.type !== i.type).length > 0)
      .map((s) => {
        return {
          type: s.type,
          label: s.label
        };
      });
  }

  private getInsuranceLabel(type: string) {
    return insuranceTypes.filter(obj => obj.type === type)[0].label;
  }

  private getInsuranceType(label: string) {
    return insuranceTypes.filter(obj => obj.label === label)[0].type;
  }
}
