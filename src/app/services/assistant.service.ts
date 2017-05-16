import { Injectable } from '@angular/core';

import { AppAssistantConfig, AssistantConfig } from './../models/assistant';

@Injectable()
export class AssistantService {
  public config: AssistantConfig;

  constructor() {
    this.config = new AppAssistantConfig();
  }
}
