import { NumberExtended } from './address';

export class Profile {
  firstname: string;
  infix: string;
  lastname: string;
  name: string;
  gender: string;
  anonymous: boolean;
  id: number;
  emailaddress: string;
  birthday: string; //1989-09-27
  nickname: string;
  profile_image: string;
  needs: any;
  household: string;
  active: boolean;
  enabled: boolean;
  phone: string;
  age: number;
  bsn: string;
  initials: string;
  birthplace: string;
  maritalstatus: string;
  maritaldistribution: string;
  education: string;
  smoking: boolean;
  testament: string;
  yearsabroad: number;

  // Address
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
  // End Address

  _id: string;
  _deleted: boolean;
  _embedded: any;

  filled_data_percentage: number;
  outdated_data_percentage: number;
}
