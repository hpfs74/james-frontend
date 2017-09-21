import { Injectable } from '@angular/core';

import { AssistantConfig } from '../models/assistant';

@Injectable()
export class AssistantService {
  public config: AssistantConfig;

  constructor() {
    // For now this just creates an object with language specific strings
    // It's encapsulated in this service for future use of external/async
    // content loading.
    this.config = new AssistantConfig();
  }
}
