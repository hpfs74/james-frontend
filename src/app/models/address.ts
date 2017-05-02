export interface IAddress {
  postcode?: string;
  number: string;
  street: string;
  county: string;
  province: string;
  fullname: string;
  location?: {
    lat: number;
    lng: number;
  };
  built?: number;
  house_size?: number;
  house_value?: number;
  house_info_roof_condition_text?: string;
}


/**
 * @description
 * Class definition for address type used by user profile
 */
export class Address implements IAddress {
  number: string;
  street: string;
  city: string;
  county: string;
  province: string;
  fullname: string;
  location: {
    lat: number;
    lng: number;
  };
  built: number;
  size: number;
}

