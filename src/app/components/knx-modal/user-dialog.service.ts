import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { KNXModalDialogService, KNXModalDialogSettings, KNXModalDialogOptions } from '@knx/modal';

import * as fromRoot from '../../reducers';
import * as layout from '../../core/actions/layout';

@Injectable()
export class UserDialogService {

  constructor(private modalService: KNXModalDialogService, private store$: Store<fromRoot.State>) { }

  public openModal(modalName: string, title: string, viewRef: ViewContainerRef, component: any, settings?: KNXModalDialogSettings) {
    const dialogOptions = {
      title: title,
      childComponent: component,
      settings: settings
    } as KNXModalDialogOptions;

    this.modalService.openDialog(viewRef, dialogOptions);
    this.store$.dispatch(new layout.OpenModal(modalName));
  }
}
