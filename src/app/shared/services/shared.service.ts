import { Injectable } from '@angular/core';

/**
 * this service is created to share data between components or other services
 */
@Injectable()
export class SharedService {

  tempVariables: Map<any, any> = new Map<any, any>();
  constructor() {}
}
