import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../auth/services';
import { AddressSuggestion } from '../models';

@Injectable()
export class SuggestionService {
  private suggestionUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.suggestionUrl = environment.james.suggestion;
  }

  public lookupSuggestions(zipcode: string, house_number: string): Observable<AddressSuggestion> {
    const body = {
      zipcode: zipcode,
      house_number: house_number
    };
    return this.authHttp.post(this.suggestionUrl, body)
      .map((res) => res.json());
  }
}
