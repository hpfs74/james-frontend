import { Action } from '@ngrx/store';
import { PackagePremiumRequest, PackagePremiumResponse } from '@app/house/models/package-premium';

export const NEW_BUY = '[PackagePremiumBuy] New Buy';
export const NEW_BUY_COMPLETE = '[PackagePremiumBuy] New Buy Complete';
export const NEW_BUY_FAILURE = '[PackagePremiumBuy] New Buy Failure';


export class NewBuy implements Action {
  readonly type = NEW_BUY;

  constructor(public payload: PackagePremiumRequest) {
  }
}

export class NewBuyComplete implements Action {
  readonly type = NEW_BUY_COMPLETE;

  constructor(public payload: PackagePremiumResponse) {
  }
}

export class NewBuyFailure implements Action {
  readonly type = NEW_BUY_FAILURE;

  constructor(public payload: any) {
  }
}

export type All
  = NewBuy
  | NewBuyComplete
  | NewBuyFailure;
