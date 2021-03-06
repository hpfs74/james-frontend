import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import * as fromRoot from '../../reducers';
import * as fromRouter from '../../core/actions/router';
import * as fromCore from '../../core/reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromProfile from '../../profile/reducers';
import * as assistant from '../../core/actions/assistant';

import { AssistantConfig } from '../../core/models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { Profile } from '../../profile/models';
import { InsuranceMap, Insurance, insuranceTypes } from '../../insurance/models';

@Component({
  template: '<span></span>',
  // templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  insurances: Array<Insurance>;

  chatConfig$: Observable<AssistantConfig>;
  profile$: Observable<Profile>;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor(private store$: Store<fromRoot.State>) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));
  }

  ngOnInit() {
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.store$.dispatch(new assistant.ClearAction);

    this.profile$
      .filter((profile) => profile.firstname !== undefined)
      // .distinctUntilChanged((prev, next) => prev._id === next._id)
      .take(1)
      .subscribe((profile) => {
        this.store$.dispatch(new assistant.AddCannedMessage({
          key: 'dashboard.welcome',
          value: profile.firstname || null
        }));
      });

    this.store$.select(fromInsurance.getInsurances).subscribe((docs) => {
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

  goToActions(insuranceType: string) {
    this.store$.dispatch(new fromRouter.Go({ path: [ '/insurance', insuranceType ] }));
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
