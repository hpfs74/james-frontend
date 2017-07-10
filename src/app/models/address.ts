/**
 * @description
 * Class definition for address type used by user profile
 */
export interface NumberExtended {
  number_only: number;
  number_letter: string;
  number_addition: string;
  number_extension: string;
}

export class Address {
  _id: string;
  postcode?: string;
  number: string;
  number_extended?: NumberExtended;
  street: string;
  city: string;
  county: string;
  province: string;
  fullname: string;
  location: {
    lat: number;
    lng: number;
  };
  built?: number;
  size?: number;
  house_size?: number;
  house_value?: number;
  house_info_roof_condition_text?: string;
  house_info_house_type_text?: string;
  house_info_house_use_text?: string;
  rooms?: number;
  build_type?: any;
  isolation_glass?: boolean;
  house_type?: any;
  house_subtype?: any;
}

