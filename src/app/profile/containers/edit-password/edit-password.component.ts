import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs/Subscription';

import * as FormUtils from '@app/utils/base-form.utils';
import * as fromProfile from '../../reducers';
import * as fromCore from '@app/core/reducers';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as profile from '../../actions/profile';
import * as settings from '../../actions/settings';
import * as auth from '@app/auth/actions/auth';
import * as fromAuth from '@app/auth/reducers';
@Component({
  selector: 'knx-profile-edit-password',
  templateUrl: './edit-password.component.html'
})

export class ProfileEditPasswordComponent implements OnInit, OnDestroy {
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  savedInsurances$: Observable<any>;
  form: PasswordForm;
  profile$: Observable<Profile>;
  settings$: Observable<any>;
  profileLoading$: Observable<boolean>;
  pending$: Observable<boolean>;
  subscription$: Subscription[] = [];
  customError: string;
  passwordChange$: Subscription;
  constructor(private store$: Store<fromProfile.State>,
              private tagsService: TagsService) {
    this.chatConfig$ = store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.pending$ = this.store$.select(fromAuth.getChangePasswordLoading);
    this.subscription$.push(
      this.store$.select(fromAuth.getPasswordChangedError).subscribe(error => this.customError = error)
    );
  }

  ngOnInit() {
    this.form = new PasswordForm(new FormBuilder());
    this.customError = null;
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe);
  }

  goBack() {
    this.store$.dispatch(new router.Back());
  }

  save() {
    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.get(key).markAsTouched();
    });
    this.form.formGroup.updateValueAndValidity();
    const old_password = this.form.formGroup.get('oldPassword');
    const new_password = this.form.formGroup.get('newPassword');
    this.customError = null;
    if (this.form.formGroup.valid) {
      if (this.passwordMatch()) {
        const action = new auth.NewPassword({old_password: old_password.value, password: new_password.value});
        this.store$.dispatch(action);
        if (!this.passwordChange$) {
          this.passwordChange$ = this.store$.select(fromAuth.getPasswordChangedStatus).subscribe(changed => {
            if (changed) {
              this.goBack();
            }
          });
        }
      } else {
        this.form.formGroup.setErrors({matching: true});
      }
    }
  }

  passwordMatch(): boolean {
    const new_password = this.form.formGroup.get('newPassword');
    const confirm_password = this.form.formGroup.get('confirmPassword');
    if ( new_password.value === confirm_password.value ) {
      return true;
    }
    return false;
  }

  getErrors(): Array<string> {
    if (this.customError) {
      return [this.customError];
    }
    return this.form.formGroup.errors ?
      Object.keys(this.form.formGroup.errors).map(error => this.getErrorMessage(error))
      : null;
  }

  getErrorMessage(errorCode: string): string {
    if (this.form.validationErrors && this.form.validationErrors[errorCode]) {
      const errorMessage = this.form.validationErrors[errorCode];

      return (typeof errorMessage === 'string') ?
        errorMessage : errorMessage(errorMessage);
    }
  }
}
