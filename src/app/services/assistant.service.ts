import { Injectable } from '@angular/core';

import { AssistantConfig } from './../models/assistant';

@Injectable()
export class AssistantService {
  public config: AssistantConfig;

  constructor() {
    this.config = new AssistantConfig();
  }
}
