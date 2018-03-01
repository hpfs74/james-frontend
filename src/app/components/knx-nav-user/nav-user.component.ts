import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Profile } from '../../profile/models';
import * as fromRoot from '../../reducers';
import * as router from '../../core/actions/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'knx-nav-user',
  styleUrls: ['./nav-user.component.scss'],
  templateUrl: './nav-user.component.html'
})
export class NavUserComponent {
  @Input() profile: Profile;
  @Input() showAccount: boolean;
  @Input() isLoggedIn = false;
  @Output() onLogOut = new EventEmitter();

  constructor(private store$: Store<fromRoot.State>) { }

  goToProfile() {
    this.store$.dispatch(new router.Go({ path: ['/profile-overview'] }));
  }

  getShortEmail(emailaddress: string) {
    return emailaddress ? emailaddress.substring(0, emailaddress.indexOf('@')) : '';
  }

  logOut() {
    this.onLogOut.emit();
  }

  goToPurchased() {
    this.store$.dispatch(new router.Go({path: ['/car/purchased']}));
  }
}
