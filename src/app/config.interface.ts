import { Injectable } from '@angular/core';

export interface ConfigInterface {
  app: {
    enableProdMode?: boolean;
    name?: string;
  };
  api: ConfigAPIInterface;
}

export interface ConfigAPIInterface {
  nicciProxy: NicciEndpoint,
  external?: {
    //TODO: for config endpoints like Blueconic, Google Analytics
  }
}

export interface NicciEndpoint {
  auth?: string;
}

// @Injectable()
// export class AppConfig {
//   ready: boolean = false;
//   config: ConfigInterface;

//   getInstance(cfg: ConfigInterface) {
//     this.config = cfg;
//     this.ready = true;
//     return this;
//   }
//   getConfig(): ConfigInterface {
//     if (this.ready) {
//       return this.config;
//     } else {
//       throw Error('Config not set');
//     }
//   }
// }
