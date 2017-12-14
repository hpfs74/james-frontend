import { Component, ComponentRef } from '@angular/core';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { KNXFeatureToggleService } from '@knx/feature-toggle';

import * as fromCore from '../reducers';
import * as router from '../actions/router';
import * as fromInsurance from '../../insurance/reducers';

@Component({
  selector: 'knx-auth-redirect',
  styleUrls: ['./auth-redirect.modal.component.scss'],
  template: `
    <div class="knx-auth-redirect__content">
      <h3 class="knx-auth-redirect_header">Maak een Knab Verzekeren account aan</h3>
      <p>En ga direct verder met het aanvragen van je verzekering</p>
    </div>
  `
})
export class AuthRedirectModalComponent implements KNXModalDialog {
  actionButtons: KNXModalDialogButton[];

  constructor(private store$: Store<fromCore.State>, private featureToggleService: KNXFeatureToggleService) {
    this.actionButtons = [
      {
        text: 'Inloggen',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--3d knx-button--primary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/login']}));
          return true;
        }
      },
      {
        text: 'Registreren',
        buttonClass: 'knx-button knx-button--fullwidth knx-button--3d knx-button--secondary',
        onAction: () => {
          this.store$.dispatch(new router.Go({ path: ['/register']}));
          return true;
        }
      },
    ];

    if (this.featureToggleService.isOn('enableBuyFlowEmail')) {
      this.actionButtons[0].position =  this.actionButtons[1].position = 'left';

      this.actionButtons[0].buttonClass = this.actionButtons[1].buttonClass =
        'knx-button knx-button--fullwidth knx-button--3d knx-button--primary';

      this.actionButtons.push({
          text: 'Verder <span>zonder account</span>',
          position: 'right',
          buttonClass: 'knx-button knx-button--secondary knx-button--ghost',
          onAction: () => {
            this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
              advice => {
                if (advice && advice.id) {
                  this.store$.dispatch(new router.Go({
                    path: ['/car/insurance', {adviceId: advice.id}],
                  }));
                }
              });
            return true;
          }
        });
    }
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}
}
