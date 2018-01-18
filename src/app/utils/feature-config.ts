import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';

@Injectable()
export class FeatureConfig {
  endpointUrl: string = environment.james.featureToggle;
  features: any;
  constructor(private http: Http) {

  }

  load(): Promise<any> {
    return this.http.request(this.endpointUrl)
      .map(res => res.json())
      .toPromise()
      .then((data) => this.features = data)
      .catch(error => Promise.resolve());
  }
}
