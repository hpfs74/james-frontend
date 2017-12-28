import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { BaseForm } from '@app/shared/forms/base-form';
import { Profile } from '../../models/profile';
import { Settings } from '../../models/settings';
import { ProfileForm } from '../../components/profile-form/profile.form';
import { TagsService } from '@app/core/services';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromProfile from '../../reducers';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as profile from '../../actions/profile';
import * as settings from '../../actions/settings';

@Component({
  templateUrl: 'edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  profileForm: ProfileForm;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  profile$: Observable<Profile>;

  constructor(private store$: Store<fromProfile.State>,
              private tagsService: TagsService) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction());
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'profile.hello' }));
    this.profileForm = new ProfileForm(new FormBuilder(), this.tagsService.getAsLabelValue('insurance_flow_household'));
  }

  navigateBack() {
    this.store$.dispatch(new router.Back());
  }

  save(event) {
    this.store$.dispatch(new profile.UpdateAction(Object.assign({}, {
        avatar: event.avatar,
        gender: event.gender,
        firstname: event.firstName,
        lastname: event.lastName,
        birthday: FormUtils.toNicciDate(event.birthDate),
        household: event.houseHold
      }, event.address)));

    this.store$.dispatch(new settings.UpdateSettingsAction({
      push_notifications: !!event.pushNotifications,
      email_notifications: !!event.emailNotifications
    }));
  }
}
