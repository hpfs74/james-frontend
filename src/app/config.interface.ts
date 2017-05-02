import { Injectable } from '@angular/core';

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
  auth?: string;
  address?: string;
  profile?: string;
  car?: string;
  helper?: string;
  travel?: string;
  liability?: string;
  content?: string;
  home?: string;
}
