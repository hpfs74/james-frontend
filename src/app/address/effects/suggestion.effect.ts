import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { SuggestionService } from '../services/suggestion.service';
import { AddressSuggestionParams, AddressSuggestion } from '../models';
import * as suggestion from '../actions/suggestion';

@Injectable()
export class SuggestionEffects {

  @Effect()
  loadAddressSuggestion$: Observable<Action> = this.actions$
    .ofType(suggestion.GET_ADDRESS_SUGGESTION_REQUEST)
    .map((action: suggestion.GetAddressSuggestion) => action.payload)
    .switchMap((payload: AddressSuggestionParams) => {
      if (typeof(payload.house_number) !== 'string') {
        payload.house_number = payload.house_number[0];
      }

      return this.suggestionService.lookupSuggestions(payload.zipcode, payload.house_number)
        .map((res: AddressSuggestion) => new suggestion.GetAddressSuggestionSuccess(res))
        .catch(error => Observable.of(new suggestion.GetAddressSuggestionFailure(error)));
    });

  constructor(private actions$: Actions, private suggestionService: SuggestionService) {
  }
}
