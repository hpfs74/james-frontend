import { Address } from './address';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;

  address: Address;
}
