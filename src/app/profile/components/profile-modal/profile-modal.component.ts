import { Component, ComponentRef, OnDestroy } from '@angular/core';
import { KNXModalDialog, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '@env/environment.prod';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

import * as fromInsurance from '@app/insurance/reducers';
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
  savedInsurances$: Observable<any>;

  constructor(private store$: Store<fromProfile.State>,
              private localStorageService: LocalStorageService) {
    this.pending$ = this.store$.select(fromProfile.getProfileDeleteLoading);
    this.error$ = this.store$.select(fromProfile.getProfileDeleteError);
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurances);

  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}

  hasPurchasedInsurances(): Observable<boolean> {
    return this.savedInsurances$
      .filter(purchasedInsurances => purchasedInsurances !== null)
      .take(1)
      .map(purchasedInsurances => {
        const insurances = purchasedInsurances.car.insurance;
        if (insurances.length && insurances.filter(insurance =>
            (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
          return true;
        }
        return false;
      });
  }

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
