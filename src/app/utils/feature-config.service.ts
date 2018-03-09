import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from '@app/core/services/cookie.service';
import { environment } from '@env/environment';

const FEATURE_TOOGLE_COOKIE_NAME = 'featureToggleCookie';
@Injectable()
export class FeatureConfigService {
  endpointUrl: string = environment.james.featureToggle;
  featureConfig: any = environment.featureToggles;
  uniqueId = '';
  constructor(private http: Http,
              private cookies: CookieService) {}

  mergeWithWindowConfig() {
    this.featureConfig = Object.assign({}, this.featureConfig, window['featureConfig']);
  }

  /**
   * return boolean if value exists on feature config object
   * can also be used to hide an feature if we don't have the feature var set to true
   * @param value string value in feature config object
   */
  isOn(value: string) {
    this.mergeWithWindowConfig();
    if (this.featureConfig.hasOwnProperty(value)) {
      return this.featureConfig[value] === 'false' ? false : this.featureConfig[value] ;
    }
    return false;
  }
  /**
   * If ID's are generated more than 1 milliseconds apart, they are 100% unique.
   * If two ID's are generated at shorter intervals, and assuming that the random method is truly random,
   * this would generate ID's that are 99.99999999999999% likely to be globally unique.
   */
  getUniqueId() {
    const cookies = this.cookies.get(FEATURE_TOOGLE_COOKIE_NAME);
    if (cookies) {
      this.uniqueId = JSON.parse(cookies).uniqueId;
    } else {
      this.uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
      this.setCookie({
        uniqueId: this.uniqueId,
        group: '0'
      });
    }
    return this.uniqueId;
  }

  /**
   * return a feature group Letter from a cookie, A, B or if no cookie set returns 0
   */
  getFeatureGroup() {
    const cookies = this.cookies.get(FEATURE_TOOGLE_COOKIE_NAME);
    if (cookies) {
      return JSON.parse(cookies).group;
    }
    return '0';
  }

  load(): Promise<any> {
    return Promise.resolve()
      .then(() => this.mergeWithWindowConfig())
      .catch(error => this.handleError(error));
  }

  setCookie(value: any) {
    const cookieName = FEATURE_TOOGLE_COOKIE_NAME;
    const cookieValue = JSON.stringify(value);
    const cookieExpires = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // one year
    const cookiePath = '/';
    const cookieDomain = environment.domain;
    const cookieSecure = false;

    this.cookies.set(cookieName, cookieValue, cookieExpires, cookiePath, cookieDomain, cookieSecure);
  }

  /**
   * TODO for now this service will be like this,
   * when CSP is enabled and I can test properly the VWO service,
   * and it works, that most of the code here will be refactored
   *
   *
   *
   * sets the cookie for the first time, and also sets the feature toggle variables
   * @param data response from endpoint
   */
  handleFeatureResponse(data: any) {
    const response = JSON.parse(data.body);
    if (response.featureGroup) {
      this.setCookie({
        uniqueId: this.uniqueId,
        group: response.featureGroup
      });
      this.featureConfig = response.config;
      // add data to datalayer for GA
      if (response.ga) {
        window['dataLayer'].push(response.ga);
      }
    }
  }

  handleError(error: any) {
    return; // TODO implement correct error handling
  }
}

/**
 * current AB test variables:
 *
 * productOrder
 * profileScore
 * disscountBasedOnYear
 * showAllResults
 */
