import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/distinctUntilChanged';

import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { ChatStreamComponent } from './../../components/knx-chat-stream/chat-stream.component';

import * as fromRoot from '../../reducers';
import * as assistant from '../../actions/assistant';

import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { AuthService } from '../../services/auth.service';
import { Profile, InsuranceMap, Insurance, insuranceTypes } from '../../models';

@Component({
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  chatConfig: AssistantConfig;
  insurances: Array<Insurance>;

  profile$: Observable<Profile>;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private assistantService: AssistantService
  ) {
    this.chatConfig = assistantService.config;
    this.chatConfig.avatar.title = 'Expert verzekeringen';
    this.chatMessages$ = store.select(fromRoot.getAssistantMessageState);
  }

  ngOnInit() {
    this.profile$ = this.store.select(fromRoot.getProfile);
    // this.insurances$ = this.store.select(fromRoot.getInsurances);

    this.store.dispatch(new assistant.ClearAction);

    this.profile$
      .distinctUntilChanged((prev, next) => prev._id === next._id)
      .take(1)
      .subscribe((profile) => {
      if (Object.keys(profile).length > 0) {
        this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.dashboard.welcome(profile.firstname)));
      }
    });

    this.store.select(fromRoot.getInsurances).subscribe((docs) => {
      const insuranceItems = Object.keys(insuranceTypes).map((i) => insuranceTypes[i].type);

      const myInsurances = [];
      Object.keys(docs)
        .filter((key) => insuranceItems.indexOf(key) !== -1)
        .forEach((key) => {
          docs[key].documents.forEach(element => {
            myInsurances.push(Object.assign(element, {
              type: key,
              label: this.getInsuranceLabel(key)
            }));
          });
        });

      if (myInsurances && myInsurances.length > 0) {
        this.insurances = myInsurances.concat(this.getRemainingInsurances(insuranceTypes, myInsurances));
      } else {
        // TODO: also add default insurances if getUserProfile call fails or show error
        this.insurances = insuranceTypes.map((s) => {
          return {
            _id: null,
            status: null,
            reference: null,
            type: s.type,
            label: s.label
          };
        });
      }
    });
  }

  goToActions(type: string) {
    this.router.navigate(['/insurance', type]);
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

  private getRemainingInsurances(validTypes: Array<InsuranceMap>, items: Array<any>): Array<any> {
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
