
export interface ConfigInterface {
  app: {
    enableProdMode?: boolean;
    name?: string;
  };
  api: ConfigAPIInterface;
}

export interface ConfigAPIInterface {
  james: NicciEndpoint,
  external?: {
    //TODO: for config endpoints like Blueconic, Google Analytics
  }
}

export interface NicciEndpoint {
  base: string;
  key: string;
  token: string;
  auth: string;
  profile: string;
  address: string;
  insurer: string;

  cars: string;
  car_compare: string;
  car_coverage: string;
  car_damagefree: string;
  car_buy: string;
}
