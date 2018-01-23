import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';

import { environment } from '@env/environment';
import { KNXFeatureToggleService } from '@knx/feature-toggle';

const FEATURE_TOOGLE_COOKIE_NAME = 'featureToggleCookie';

@Injectable()
export class FeatureConfig {
  endpointUrl: string = environment.james.featureToggle;
  constructor(private http: Http,
              private cookies: CookieService,
              private knxFeatureToggleService: KNXFeatureToggleService) {}

  /**
   * GUID (or UUID) is an acronym for 'Globally Unique Identifier'
   * (or 'Universally Unique Identifier').
   * It is a 128-bit integer number used to identify resources.
   * The term GUID is generally used by developers working with Microsoft technologies,
   * while UUID is used everywhere else.
   */
  guid() {
    let nav = window.navigator;
    let guid = nav.mimeTypes.length.toString();
    let screen = window.screen;
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return guid;
  }

  /**
   * return a feature group Letter from a cookie, A, B or if no cookie set returns 0
   */
  getFeatureGroup() {
    const cookies = this.cookies.check(FEATURE_TOOGLE_COOKIE_NAME);
    if (cookies) {
      return this.cookies.get(FEATURE_TOOGLE_COOKIE_NAME);
    }
    this.cookies.set(FEATURE_TOOGLE_COOKIE_NAME, '0');
    return '0';
  }

  load(): Promise<any> {
    const body = {
      userId: this.guid(),
      featureGroup: this.getFeatureGroup()
    };
    return this.http.post(this.endpointUrl, body)
      .map(res => res.json())
      .toPromise()
      .then((data) => this.handleFeatureResponse(data))
      .catch(error => Promise.resolve());
  }

  /**
   * sets the cookie for the first time, and also sets the feature toggle variables
   * @param data response from endpoint
   */
  handleFeatureResponse(data: any) {
    const response = JSON.parse(data.body);
    if (response.featureGroup) {
      this.cookies.set(FEATURE_TOOGLE_COOKIE_NAME, response.featureGroup);
      this.knxFeatureToggleService.setNewConfig(response.config);
    }
  }
}
