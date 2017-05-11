import { User } from './user';
import { Address } from './address';
import { Car } from './car';

/**
 * @description
 * Additional settings required for making an insurance advice request
 *
 * @export
 * @interface ICarInsuranceOptions
 */
export interface ICarInsuranceOptions {
  active_loan: boolean;
  cover_occupants?: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;
  kilometers_per_year?: string;
  legal_aid?: string;
  no_claim_protection?: boolean;
  own_risk?: number;
  risk?: string;
  road_assistance?: string;
}

/**
 * @description
 * Interface for request payload for car insurance advice request
 *
 * @export
 * @interface ICarUser
 */
export interface ICarUser {
  active_loan: boolean;
  license: string;
  country: string;
  cover_occupants?: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;
  kilometers_per_year?: string;
  legal_aid?: string;
  no_claim_protection?: boolean;
  own_risk?: number;
  risk?: string;
  road_assistance?: string;
  date_of_birth: string;
  first_name: string;
  gender: string;
  house_number: string;
  last_name: string;
  title: string;
  zipcode: string;
  insurance?: string;
}

export class CarUser implements ICarUser {
  // minimal required options
  active_loan: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;

  // these are optional in new car flow
  cover_occupants: boolean;
  kilometers_per_year: string;
  legal_aid: string;
  no_claim_protection: boolean;
  own_risk: number;
  risk: string;
  road_assistance: string;

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
  constructor(profile: User, car: Car, address: Address, options: ICarInsuranceOptions) {

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
};
