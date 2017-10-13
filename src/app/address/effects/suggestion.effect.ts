import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { SuggestionService } from '../services/suggestion.service';
import { AddressSuggestionParams, AddressSuggestion } from '../models';
import * as suggestion from '../actions/suggestion';

@Injectable()
export class SuggestionEffects {

  addressDebounce = 500;

  @Effect()
  loadAddressSuggestion$: Observable<Action> = this.actions$
    .ofType(suggestion.GET_ADDRESS_SUGGESTION_REQUEST)
    .map((action: suggestion.GetAddressSuggestion) => action.payload)
    .debounceTime(this.addressDebounce) // prevent lookup on each suggestion input keyup event
    .switchMap((payload: AddressSuggestionParams) =>
      this.suggestionService.lookupSuggestions(payload.zipcode, payload.house_number)
        .map((res: AddressSuggestion) => new suggestion.GetAddressSuggestionSuccess(res))
        .catch(error => Observable.of(new suggestion.GetAddressSuggestionFailure(error))));

  constructor(private actions$: Actions, private suggestionService: SuggestionService) {}
}
