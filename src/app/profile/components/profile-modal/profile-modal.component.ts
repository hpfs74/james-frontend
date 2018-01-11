import { Component, Input, Output, EventEmitter, ComponentRef, OnDestroy } from '@angular/core';
import { KNXModalDialog, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '@env/environment.prod';

import * as fromProfile from '../../reducers';
import * as profile from '../../actions/profile';
import * as layout from '@app/core/actions/layout';

@Component({
  selector: 'knx-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})

export class ProfileModalComponent implements KNXModalDialog, OnDestroy {
  pending$: Observable<any>;
  subscription$: Subscription[] = [];
  constructor(private store$: Store<fromProfile.State>) {
    this.pending$ = this.store$.select(fromProfile.getProfileDeleteLoading);
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
          window.location.href = environment.external.static;
        }
      })
    );
  }
}
