/**
 * @description
 * Class definition for address type used by user profile
 */
export class Address {
  houseNumber: string;
  houseNumberExtension: string;
  zipCode: string;

  street: string;
  city: string;
  county: string;
  province: string;
  fullname: string;
  location: {
    lat: number,
    lng: number
  };
}
