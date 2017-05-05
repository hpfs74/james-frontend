export interface ICar {
  license: string;
  vin: string;
  reporting_code: string;
  year: number;
  fuel: string;
  secondary_fuel?: string;
  color: string;
  color_code: string;
  secondary_color?: string;
  secondary_color_code?: string;
  weight_empty_vehicle?: number;
  price_consumer_excl_vat: number;
  price_consumer_incl_vat: number;
  make: string;
  model: string;
  technical_type: string;
  wheels: number;
  top_speed: number;
  engine_capacity: number;
  power_kw: number;
  transmission: string;
  transmission_nl?: string;
  edition?: string;
  doors: number;
};

/**
 * @description
 * Class to describe a vehicle data to be presented
 * through the knab-vehicle.
 */
export class Car implements ICar {
  license: string;
  vin: string;
  reporting_code: string;
  year: number;
  fuel: string;
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
  transmission: string;
  transmission_nl: string;
  edition?: string;
  doors: number;
}

export const MockCar: ICar = {
  'license': '71ZXK6',
  'vin': 'VF1BA0F0G17869206',
  'reporting_code': '9206',
  'year': 2016,
  'fuel': 'Gasoline',
  'secondary_fuel': null,
  'color': 'Blauw',
  'color_code': '04',
  'secondary_color': 'Onbekend',
  'secondary_color_code': '99',
  'weight_empty_vehicle': 1030,
  'price_consumer_excl_vat': 14841,
  'price_consumer_incl_vat': 16976,
  'make': 'RENAULT',
  'model': 'MEGANE',
  'technical_type': '1.6 E HB RT',
  'wheels': 4,
  'top_speed': 184,
  'engine_capacity': 1598,
  'power_kw': 66,
  'transmission': 'Manual',
  'transmission_nl': 'Handgeschakeld',
  'edition': null,
  'doors': 5,
};
