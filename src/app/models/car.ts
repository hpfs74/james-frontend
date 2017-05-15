/**
 * @description
 * Class to describe a vehicle data to be presented
 * through the knab-vehicle.
 */
export class Car {
  license: string;
  vin: string;
  reporting_code: string;
  year: string | number;
  fuel: string;
  fuel_code?: string;
  secondary_fuel: string;
  color: string;
  color_code: string;
  secondary_color: string;
  secondary_color_code: string;
  weight_empty_vehicle: number;
  price_consumer_excl_vat: number;
  price_consumer_incl_vat: number;
  make: string;
  model: string;
  technical_type: string;
  wheels: number;
  top_speed: number;
  engine_capacity: number;
  power_kw: number;
  transmission?: string;
  transmission_nl?: string;
  edition?: string;
  doors: number;
  slug?: Array<string>;
  current_value?: string | number;
}
