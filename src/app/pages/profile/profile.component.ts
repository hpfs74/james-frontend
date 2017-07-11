import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { BaseForm } from '../../forms/base-form';
import { Profile } from '../../models/profile';
import { Settings } from '../../models/settings';
import { ProfileForm } from './profile.form';

import * as fromRoot from '../../reducers';
import * as assistant from '../../actions/assistant';
import * as profile from '../../actions/profile';
import * as settings from '../../actions/settings';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: ProfileForm;
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
    this.store.dispatch(new assistant.AddMessageAction(this.chatConfig.profile.hello));
    this.profileForm = new ProfileForm(new FormBuilder());
  }

  navigateBack() {
    this.store.dispatch(back());
  }

  save(event) {
    // this.store.dispatch(new profile.UpdateAction(Object.assign({}, {
    //     avatar: event.avatar,
    //     gender: event.gender,
    //     firstname: event.firstName,
    //     lastname: event.lastName,
    //     birthday: moment(event.birthDate).format('YYYY-MM-DD')
    //   }, event.address)));

    this.store.dispatch(new settings.UpdateSettingsAction({
      push_notifications: !!event.pushNotifications,
      email_notifications: !!event.emailNotifications
    }));
  }
}
