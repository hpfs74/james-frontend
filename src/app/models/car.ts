/**
 * @description
 * Class to describe a vehicle data to be presented
 * through the knab-vehicle.
 */
export class Car {
  name: string;
  manufacturer: string;
  model: string;
  engine?: string;
  transmission?: string;
  year?: Number;
  acquisitionValue?: Number;
  estimatedValue?: Number;
}
