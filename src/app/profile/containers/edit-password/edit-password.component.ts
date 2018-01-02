import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Profile, Settings } from '../../models';
import { Store } from '@ngrx/store';
import { Address } from '@app/address/models';
import { Observable } from 'rxjs/Observable';
import { AssistantConfig } from '@app/core/models/assistant';
import { ChatMessage } from '@app/components/knx-chat-stream/chat-message';
import { BaseForm } from '@app/shared/forms/base-form';
import { ProfileForm } from '../../components/profile-form/profile.form';
import { TagsService } from '@app/core/services';
import { PasswordForm } from '@app/profile/containers/edit-password/edit-password.form';
import { FormBuilder } from '@angular/forms';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromProfile from '../../reducers';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as profile from '../../actions/profile';
import * as settings from '../../actions/settings';
import * as fromInsurance from '@app/insurance/reducers';
@Component({
  selector: 'knx-profile-edit-password',
  templateUrl: './edit-password.component.html'
})

export class ProfileEditPasswordComponent implements OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  savedInsurances$: Observable<any>;
  form: PasswordForm;
  profile$: Observable<Profile>;
  settings$: Observable<any>;
  profileLoading$: Observable<boolean>;
  pending = false;
  constructor(private store$: Store<fromProfile.State>,
              private tagsService: TagsService) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
  }

  ngOnInit() {
    this.form = new PasswordForm(new FormBuilder());
  }

  goBack() {
    this.store$.dispatch(new router.Back());
  }

  save() {

  }
}
