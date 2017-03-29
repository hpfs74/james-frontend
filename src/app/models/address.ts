/**
 * @description
 * Class definition for address type used by user profile
 */
export class Address {
  postcode: string;
  street: string;
  //addressNumberExtension: string;
  city: string;
  county: string;
  province: string;
  fullname: string;
  location: {
    lat: number,
    lng: number
  };
}
