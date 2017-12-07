import { Component, ComponentRef } from '@angular/core';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCore from '../reducers';
import * as router from '../actions/router';
import * as fromInsurance from '../../insurance/reducers';

@Component({
  selector: 'knx-auth-redirect',
  styleUrls: ['./auth-redirect.modal.component.scss'],
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
        position: 'left',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--primary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/login']}));
          return true;
        }
      },
      {
        text: 'Registreren',
        position: 'left',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--primary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/register']}));
          return true;
        }
      },
      // {
      //   // TODO: change when modal button task is done
      //   text: 'Verder zonder account',
      //   buttonClass: 'knx-button knx-button--secondary knx-button--ghost',
      //   onAction: () => {
      //     this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
      //       advice => {
      //         if (advice && advice.id) {
      //           this.store$.dispatch(new router.Go({
      //             path: ['/car/insurance', {adviceId: advice.id}],
      //           }));
      //         }
      //       });
      //     return true;
      //   }
      // }
    ];
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}
}
