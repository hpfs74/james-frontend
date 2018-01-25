import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import * as LayoutActions from '../actions/layout';

import * as layout from '../actions/layout';
import { UserDialogService } from '@app/components/knx-modal/user-dialog.service';

@Injectable()
export class LayoutEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType(LayoutActions.CLOSE_MODAL)
    .do(() => {
      return this.userDialogService.modalService.closeDialog();
    });

  constructor(
    private actions$: Actions,
    private userDialogService: UserDialogService,
  ) {}
}
