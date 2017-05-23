
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
  address: string;
  profile: string;
  compare: string;
  insurer: string;
  car: string;
  helper: string;

  // to be implemented
  travel?: string;
  liability?: string;
  content?: string;
  home?: string;
  compare?: string;
}
