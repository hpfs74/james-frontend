import { Action } from '@ngrx/store';
import { AddressSuggestion, AddressSuggestionParams } from '../models';

export const GET_ADDRESS_SUGGESTION_REQUEST = '[Address] Address Suggestion';
export const GET_ADDRESS_SUGGESTION_SUCCESS = '[Address] Address Suggestion Success';
export const GET_ADDRESS_SUGGESTION_FAILURE = '[Address] Address Suggestion Failure';
export const CLEAR_ADDRESS_SUGGESTION = '[Address] Address Clear Suggestion';

export class GetAddressSuggestion implements Action {
  readonly type = GET_ADDRESS_SUGGESTION_REQUEST;

  constructor(public payload: AddressSuggestionParams) {
  }
}

export class GetAddressSuggestionSuccess implements Action {
  readonly type = GET_ADDRESS_SUGGESTION_SUCCESS;

  constructor(public payload: AddressSuggestion) {
  }
}

export class GetAddressSuggestionFailure implements Action {
  readonly type = GET_ADDRESS_SUGGESTION_FAILURE;

  constructor(public payload: any) {
  }
}

export class ClearAddressSuggestion implements Action {
  readonly type = CLEAR_ADDRESS_SUGGESTION;

  constructor() {
  }
}


export type All
  = GetAddressSuggestion
  | GetAddressSuggestionSuccess
  | GetAddressSuggestionFailure
  | ClearAddressSuggestion;
