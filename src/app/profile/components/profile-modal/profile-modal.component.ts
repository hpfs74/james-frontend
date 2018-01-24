import { Component, Input, Output, EventEmitter, ComponentRef, OnDestroy } from '@angular/core';
import { KNXModalDialog, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '@env/environment.prod';

import * as fromProfile from '../../reducers';
import * as profile from '../../actions/profile';
import * as layout from '@app/core/actions/layout';
import * as auth from '@app/auth/actions/auth';
import { LocalStorageService } from '@app/core/services';

@Component({
  selector: 'knx-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})

export class ProfileModalComponent implements KNXModalDialog, OnDestroy {
  pending$: Observable<any>;
  subscription$: Subscription[] = [];
  error$: Observable<string>;
  constructor(private store$: Store<fromProfile.State>,
              private localStorageService: LocalStorageService) {
    this.pending$ = this.store$.select(fromProfile.getProfileDeleteLoading);
    this.error$ = this.store$.select(fromProfile.getProfileDeleteError);
  }
  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe);
  }

  cancel() {
    this.store$.dispatch(new layout.CloseModal());
  }

  deleteProfile() {
    this.store$.dispatch(new profile.DeleteAction());
    this.subscription$.push(
      this.store$.select(fromProfile.getProfileDeleteSuccess).subscribe(deleted => {
        if (deleted) {
          this.store$.dispatch(new auth.Logout);
          this.localStorageService.clearToken();
          window.location.href = environment.external.static;
        }
      })
    );
  }
}
