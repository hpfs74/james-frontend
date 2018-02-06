import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions } from '@knx/wizard';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cuid from 'cuid';


import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { AssistantConfig } from '@app/core/models/assistant';
import { TagsService } from '@app/core/services/tags.service';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { KNXWizardRxComponent } from '@app/components/knx-wizard-rx/knx-wizard-rx.component';
import { KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import * as FormUtils from '@app/utils/base-form.utils';
import * as fromRoot from '@app/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromCore from '@app/core/reducers';

// Core actions
import * as layout from '@app/core/actions/layout';
import * as assistant from '@app/core/actions/assistant';

// House hold actions
import * as housedata from '@app/house/actions/house-data';

// Other actions
import * as wizardActions from '@app/core/actions/wizard';

import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * HouseHoldPremiumsComponent
 *
 *
 */
@Component({
  templateUrl: 'house-hold-premiums.component.html',
  styleUrls: ['./house-hold-premiums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldPremiumsComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.houseHoldPremiumsRoot;

  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  // State of the advice forms data
  subscription$: Subscription[] = [];
  // Forms
  // houseHoldExtrasForm: HouseHoldExtrasForm;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService) {
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert verzekeringen'
      }
    }));

    // bind observables
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);

    // initialize forms
    const formBuilder = new FormBuilder();
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  private onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }
}
