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
import { ProfileForm } from './profile.form';

import * as fromRoot from '../../reducers';
import * as assistant from '../../actions/assistant';
import * as profile from '../../actions/profile';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: ProfileForm;
  chatConfig: AssistantConfig;
  chatMessages$: Observable<Array<ChatMessage>>;

  constructor( private assistantService: AssistantService, private store: Store<fromRoot.State>, ) {
    this.chatConfig = assistantService.config;
    this.chatMessages$ = store.select(fromRoot.getAssistantMessageState);
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
    // this.store.dispatch(new profile.UpdateAction({
    //   avatar: event.avatar,
    //   gender: event.gender,
    //   firstname: event.firstName,
    //   lastname: event.lastName,
    //   birthday: moment(event.birthDate).format('YYYY-MM-DD'),
    //   address: event.address
    // }));
  }
}
