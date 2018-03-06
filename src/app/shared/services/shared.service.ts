import { Injectable } from '@angular/core';

/**
 * these properties are to be use in a Map as keys
 * to keep all keys in one place
*/
export const TEMP_VARIABLE_KEYS = {
  carFlow: 'carFlow'
};

/**
 * this service is created to share data between components or other services
 */
@Injectable()
export class SharedService {

  tempVariables: Map<any, any> = new Map<any, any>();
  constructor() {}
}
