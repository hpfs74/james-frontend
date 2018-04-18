import { Action } from '@ngrx/store';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';
import {
  HouseHoldStoredAdviceRequest,
  HouseHoldStoredAdviceResponse
} from '@app/house/models/house-hold-stored-advice';
import { InsuranceStore, ContactDetails } from '@app/house/models/house-hold-store';
import { PackagePremium } from '@app/house/models/house-hold-data';

export const START = '[HouseHold] Start';
export const GET_INFO = '[HouseHold] Info';
export const UPDATE_INFO = '[HouseHold] Update';
export const UPDATE_ADVICE = '[HouseHold] Update Advice';
export const STORE_ADVICE = '[HouseHold] Store Advice';
export const STORE_ADVICE_COMPLETE = '[HouseHold] Store Advice Complete';
export const STORE_ADVICE_FAILURE = '[HouseHold] Store Advice Failure';
export const NEW_FLOW_STORE_ADVICE = '[HouseHold] New Flow Advice';
export const NEW_BUY = '[HouseHold] New Buy';
export const NEW_BUY_COMPLETE = '[HouseHold] New Buy Complete';
export const NEW_BUY_FAILURE = '[HouseHold] New Buy Failure';

export class Get implements Action {
  readonly type = GET_INFO;
}

export class Update implements Action {
  readonly type = UPDATE_INFO;

  constructor(public payload: any) {
  }
}

export class UpdateAdvice implements Action {
  readonly type = UPDATE_ADVICE;

  constructor(public payload: CalculatedPremium) {
  }
}

export class Start implements Action {
  readonly type = START;
}

export class StoreAdvice implements Action {
  readonly type = STORE_ADVICE;

  constructor(public payload: HouseHoldStoredAdviceRequest) {
  }
}

export class StoreAdviceComplete implements Action {
  readonly type = STORE_ADVICE_COMPLETE;

  constructor(public payload: HouseHoldStoredAdviceResponse) {
  }
}

export class StoreAdviceFailure implements Action {
  readonly type = STORE_ADVICE_FAILURE;

  constructor(public payload: any) {
  }
}

export class NewFlowAdviceStore implements Action {
  readonly type = NEW_FLOW_STORE_ADVICE;

  constructor(public payload: InsuranceStore) {
  }
}

export class NewBuy implements Action {
  readonly type = NEW_BUY;

  constructor(public payload: PackagePremium) {
  }
}

export class NewBuyComplete implements Action {
  readonly type = NEW_BUY_COMPLETE;
}

export class NewBuyFailure implements Action {
  readonly type = NEW_BUY_FAILURE;

  constructor(public payload: any) {
  }
}


export type All
  = Get
  | Update
  | UpdateAdvice
  | Start
  | StoreAdvice
  | StoreAdviceComplete
  | StoreAdviceFailure
  | NewFlowAdviceStore
  | NewBuy
  | NewBuyComplete
  | NewBuyFailure;
