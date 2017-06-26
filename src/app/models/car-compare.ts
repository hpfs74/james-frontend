import { Profile } from './profile';
import { Address } from './address';
import { Car } from './car';

/**
 * @description
 * Additional settings required for making an insurance advice request
 *
 * @export
 * @class CarInsuranceOptions
 */
export class CarInsuranceOptions {
  active_loan: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;

  // these are optional in new car flow
  cover_occupants?: boolean;
  kilometers_per_year?: string;
  legal_aid?: string;
  no_claim_protection?: boolean;
  own_risk?: number;
  risk?: string;
  road_assistance?: string;
}


/**
 * @description
 * Class representing the payload of the http request for car insurance advice
 */
export class CarCompare {
  // minimal required options
  active_loan: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;

  // these are optional in new car flow
  cover_occupants?: boolean;
  kilometers_per_year?: string;
  legal_aid?: string;
  no_claim_protection?: boolean;
  own_risk?: number;
  risk?: string;
  road_assistance?: string;

  // car
  license: string;

  // profile
  date_of_birth: string;
  first_name: string;
  gender: string;
  house_number: string;
  last_name: string;
  title: string;
  zipcode: string;
  country: string;

  insurance?: string;

  /* istanbul ignore next: object initializer */
  constructor(profile: any|Profile, car: Car, address: Address, options: CarInsuranceOptions) {

    this.license = car.license;
    this.date_of_birth = profile.dateOfBirth;
    this.first_name = profile.firstname;
    this.gender = profile.gender;
    this.house_number = address.number || profile.address.number;
    this.last_name = profile.lastname;
    this.title = profile.gender.toLowerCase() === 'm' ? 'Dhr.' : 'Mw.';
    this.zipcode = address.postcode || profile.address.postcode;
    this.country = 'NL'; // TODO: not in address info response?

    Object.assign(this, options);
  }
}
