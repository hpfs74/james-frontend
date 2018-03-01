export interface AdviceAddressLocation {
  lat: number;
  lng: number;
}

export interface AdviceAddressNumberExtended {
  number_only: number;
  number_letter: string;
  number_addition: string;
  number_extension: string;
}

export interface AdviceAddress {
  _id: string;
  postcode: string;
  number: string;
  street: string;
  city: string;
  county: string;
  province: string;
  fullname: string;
  location: AdviceAddressLocation;
  built: number;
  house_size: number;
  house_value: number;
  house_info_roof_condition_text: string;
  house_info_house_type_text: string;
  house_info_house_use_text: string;
  number_extended: AdviceAddressNumberExtended;
  rooms: number;
  build_type: string;
  isolation_glass: boolean;
  house_type: string;
  house_subtype: any;
}

export interface Advice {
  id: string;
  active_loan: boolean;
  coverage: string;
  claim_free_years: number;
  household_status: string;
  license: string;
  gender: string;
  title: string;
  date_of_birth: string;
  zipcode: string;
  house_number: string;
  city: string;
  country: string;
  kilometers_per_year: string;
  own_risk: number;
  cover_occupants: boolean;
  legal_aid: string;
  no_claim_protection: boolean;
  road_assistance: string;
  insurance_id: string;
  address: AdviceAddress;
}
