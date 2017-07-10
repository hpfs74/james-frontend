import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { BaseForm } from '../../forms/base-form';
import { Profile } from '../../models/profile';

import * as fromRoot from '../../reducers';
import * as assistant from '../../actions/assistant';
import * as profile from '../../actions/profile';

@Component({
  selector: 'knx-profile-settings',
  templateUrl: 'profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {
  chatConfig: AssistantConfig;
  chatMessages$: Observable<Array<ChatMessage>>;

  profile$: Observable<Profile>;

  constructor(private assistantService: AssistantService, private store: Store<fromRoot.State>) {
    this.chatConfig = assistantService.config;
    this.chatMessages$ = store.select(fromRoot.getAssistantMessageState);
    this.profile$ = this.store.select(fromRoot.getProfile);
  }

  ngOnInit() {
    this.store.dispatch(new assistant.ClearAction());
  }
}
