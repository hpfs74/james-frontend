import { Address } from './address';

/**
 * NICCI User Profile
 * @export
 * @interface IUser
 */
export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;

  address?: Address;
}

export class User implements IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
}
