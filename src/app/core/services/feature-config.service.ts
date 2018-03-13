import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class FeatureConfigService {
  featureConfig: any = environment.featureToggles;
  constructor() {}

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

  load(): Promise<any> {
    return Promise.resolve()
      .then(() => this.mergeWithWindowConfig())
      .catch(error => this.handleError(error));
  }

  private handleError(error: any) {
    return; // TODO implement correct error handling
  }

  /**
   * on app load this method will merge featureToggle object from environment variable
   * with the one set in VWO ab testing suite
   */
  private mergeWithWindowConfig() {
    this.featureConfig = Object.assign({}, this.featureConfig, window['featureConfig']);
  }

}

/**
 * current AB test variables:
 *
 * productOrder INS-1977
 * profileScore
 * disscountBasedOnYear
 * showAllResults
 */
