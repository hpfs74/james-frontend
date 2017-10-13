import { Component, Input, Output, EventEmitter, ComponentRef } from '@angular/core';
import { KNXModalDialog, KNXModalDialogButton, KNXModalDialogOptions } from '@knx/modal';

@Component({
  selector: 'knx-auth-redirect',
  template: `
    <img class="knx-auth-redirect__image" src="">
    <div class="knx-auth-redirect__content">
      <strong>Maak een Knab Verzekeren Account aan</strong>
      <p>En ga direct verder met het aanvragen van je verzekering</p>
    </div>
  `
})
export class AuthRedirectModalComponent implements KNXModalDialog {
  actionButtons: KNXModalDialogButton[];

  @Input() headerImage: string;
  @Output() loginClicked = new EventEmitter();
  @Output() registerClicked = new EventEmitter();

  constructor() {
    this.actionButtons = [
      {
        text: 'Inloggen',
        buttonClass: 'knx-button knx-button--secondary',
        onAction: () => {
          this.loginClicked.emit();
          return true;
        }
      },
      {
        text: 'Registreren',
        buttonClass: 'knx-button knx-button--primary',
        onAction: () => {
          this.registerClicked.emit();
          return true;
        }
      }
    ];
  }

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}
}
