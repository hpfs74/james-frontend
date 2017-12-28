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
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;

  profile$: Observable<Profile>;
  profileLoading$: Observable<boolean>;
  constructor(private store$: Store<fromProfile.State>,
              private tagsService: TagsService) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.profileLoading$ = this.store$.select(fromProfile.getProfileLoading);
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.ClearAction());
    this.store$.dispatch(new assistant.AddCannedMessage({ key: 'profile.hello' }));
  }

  editProfile() {
    this.store$.dispatch(new router.Go({ path: ['/profile-edit'] }));
  }

}
