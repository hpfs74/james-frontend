/**
 * @description
 * Class definition for address type used by user profile
 */
export class Address {
  number: string;
  postcode: string;
  street: string;
  city: string;
  country: string;
  province: string;
  geolocation: {
    lat: number,
    long: number
  };
}
