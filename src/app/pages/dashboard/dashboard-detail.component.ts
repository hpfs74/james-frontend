import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as profile from '../../actions/profile';
import * as assistant from '../../actions/assistant';

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
    <button class="knx-button knx-button--pill" [disabled]="true" (click)="goToInsurance()">
      <span class="knx-icon-money"></span> Huidige verzekering invullen
    </button>
  </div>
  `,
  styles: [`
    .knx-dashboard-detail { margin-bottom: 20px }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDetailComponent implements OnInit {
  insuranceType: string;

  chatConfig$: Observable<AssistantConfig>;
  profile$: Observable<Profile>;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor(
    private router: Router,
    private store$: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {
    this.chatConfig$ = store$.select(fromRoot.getAssistantConfig);
    this.chatMessages$ = store$.select(fromRoot.getAssistantMessageState);
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.insuranceType = params['type'];
      const insuranceType = this.getInsuranceLabel(this.insuranceType);

      this.store$.dispatch(new assistant.AddCannedMessage({
        key: 'dashboard.detail',
        value: insuranceType,
        clear: true
      }));
    });
  }

  goToAdvice() {
    this.router.navigate([this.insuranceType]);
  }

  goToInsurance() {
    // TODO: implement ProfileInsuranceComponent
    this.router.navigate(['/']);
  }

  private getInsuranceLabel(type: string) {
    return insuranceTypes.filter(obj => obj.type === type)[0].label.toLocaleLowerCase();
  }
}
