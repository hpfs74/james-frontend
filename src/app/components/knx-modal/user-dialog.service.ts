import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { KNXModalDialogService, KNXModalDialogSettings } from '@knx/modal';
import { LoginModalComponent } from '../../pages/login/login-modal.component';

import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';

@Injectable()
export class UserDialogService {

  constructor(private modalService: KNXModalDialogService, private store$: Store<fromRoot.State>) { }

  public openModal(modalName: string, title: string, viewRef: ViewContainerRef, component: any, settings?: KNXModalDialogSettings) {
    this.modalService.openDialog(viewRef, {
      title: title,
      childComponent: component,
      settings: settings
    });
    this.store$.dispatch(new layout.OpenModal(modalName));
  }
}