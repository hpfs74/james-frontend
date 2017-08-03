
export interface ConfigInterface {
  app: {
    enableProdMode?: boolean;
    name?: string;
  };
  api: ConfigAPIInterface;
}

export interface ConfigAPIInterface {
  james: NicciEndpoint;
  external?: {
    inbenta: string
  };
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
  carCompare: string;
  carCoverage: string;
  carDamageFree: string;
  carBuy: string;
}
