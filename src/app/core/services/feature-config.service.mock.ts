export class FeatureConfigServiceMock {

  featureConfig = {
    knabLab: false
  };

  load() {

  }

  isOn(value) {
    if (this.featureConfig.hasOwnProperty(value)) {
      return this.featureConfig[value] === 'false' ? false : this.featureConfig[value] ;
    }
    return false;
  }
}
