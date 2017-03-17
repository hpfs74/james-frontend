import { Injectable } from '@angular/core';

import { ConfigService } from '../../config.service';
import { Car } from '../../models/car';

@Injectable()
export class CarService {

  constructor(private configService: ConfigService) {
  }

  //getByLicense(license: string): Observable<Car> {
  //}
}
