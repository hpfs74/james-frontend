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

export interface AssistantConfig {
  showAvatar: boolean;
  avatarName: string;
  avatarTitle: string;
  messages: Array<any>;
}

export interface NicciEndpoint {
  base?: string;
  key?: string;
  token?: string;
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
