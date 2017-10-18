import { Component, ComponentRef } from '@angular/core';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCore from '../reducers';
import * as router from '../actions/router';

@Component({
  selector: 'knx-auth-redirect',
  template: `
    <div class="knx-auth-redirect__logo">
      <img class="knx-auth-redirect__logo" src="/assets/images/knab-logo.svg">
      <h2 class="knx-auth-redirect__subline">Verzekeren</h2>
    </div>

    <div class="knx-auth-redirect__content">
      <h3 class="knx-auth-redirect_header">Maak een Knab Verzekeren account aan</h3>
      <p>En ga direct verder met het aanvragen van je verzekering</p>
    </div>
  `
})
export class AuthRedirectModalComponent implements KNXModalDialog {
  actionButtons: KNXModalDialogButton[];

  constructor(private store$: Store<fromCore.State>) {
    this.actionButtons = [
      {
        text: 'Inloggen',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--secondary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/login']}));
          return true;
        }
      },
      {
        text: 'Registreren',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--primary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/register']}));
          return true;
        }
      }
    ];
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}
}
