import { Address } from './address';

/**
 * NICCI User Profile
 * @export
 * @interface IUser
 */
export interface IUser {
  id: number;
  emailaddress: string;
  password: string;
  firstname: string;
  infix: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;

  address?: Address;
}

export class User implements IUser {
  id: number;
  emailaddress: string;
  password: string;
  firstname: string;
  infix: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;

  address?: Address;
}
