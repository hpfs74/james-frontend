/**
 * @description
 * Class representing the payload of the http request for car insurance advice
 */
export interface CarCompare {
  id?: string;

  // minimal required options
  active_loan: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;

  // these are optional in new car flow (v1.2)
  // these fields are all mandatory
  cover_occupants: boolean;
  kilometers_per_year: string;
  legal_aid: string;
  no_claim_protection: boolean;
  own_risk?: number;
  risk?: string;
  road_assistance: string;

  // car
  license: string;

  // profile
  date_of_birth: string;
  gender: string;
  house_number: string;
  title: string;
  zipcode: string;
  country: string;

  // insurance?: string;

  // needed for v2
  insurance_id?: string;
}
