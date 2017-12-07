import { ViewContainerRef } from '@angular/core';
import { KNXModalDialogSettings } from '@knx/modal';

import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { LoginModalComponent } from '../../login/components/login-modal.component';
import { AuthRedirectModalComponent } from '../components/auth-redirect-modal.component';

export interface ModalConfig {
  title: string;
  settings: KNXModalDialogSettings;
  open(): void;
}

export class LoginModalConfig implements ModalConfig {
  title = 'Sessie verlopen';
  settings = {
    bodyClass: 'knx-modal-body',
    fullwidthButtons: true,
    header: true
  } as KNXModalDialogSettings;

  constructor(private modalName: string, private userDialogService: UserDialogService, private viewContainerRef: ViewContainerRef) {}

  open() {
    this.userDialogService.openModal(
      this.modalName,
      this.title,
      this.viewContainerRef,
      LoginModalComponent,
      this.settings
    );
  }
}

export class AuthRedirectModalConfig implements ModalConfig {
  title = '';
  settings = {
    bodyClass: 'knx-modal-body',
    fullwidthButtons: true,
    header: true,
    headerLogo: '/assets/images/knab-logo.svg',
    headerSubline: 'Verzekeren',
    closeButton: true,
    twoColFooter: true,
    dividerText: 'of'
  } as KNXModalDialogSettings;

  constructor(private modalName: string, private userDialogService: UserDialogService, private viewContainerRef: ViewContainerRef) {}

  open() {
    this.userDialogService.openModal(
      this.modalName,
      this.title,
      this.viewContainerRef,
      AuthRedirectModalComponent,
      this.settings
    );
  }
}
