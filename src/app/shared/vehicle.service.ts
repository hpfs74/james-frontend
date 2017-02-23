import { Injectable } from '@angular/core';

import { Vehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {

  getVehicleByPlate(plate:string): Vehicle {

    return {
      name: 'PANDA',
      manufacturer: 'F',
      model: 'TURBO SPECIAL'
    };
  }
}
