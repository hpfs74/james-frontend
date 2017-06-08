import { Address, Car } from './index';

export interface ProfileEmbedded {
  documents: Array<any>;
  count: number;
  limit: number;
  offset: number;
}

/**
 * NICCI User Profile
 * @export
 * @class User
 */
export class Profile {
  firstname: string;
  infix: string;
  lastname: string;
  name: string;
  gender: string;
  anonymous: boolean;
  id: number;
  emailaddress: string;
  birthday: string;
  dateOfBirth: string; // alias
  nickname: string;
  profile_image: string;
  needs: any;
  household: string;
  active: boolean;
  enabled: boolean;
  phone: string;
  age: number;
  address?: Address;

  _id: string;
  _deleted: boolean;
  _embedded: {
    car: ProfileEmbedded;
    travel: ProfileEmbedded;
    content: ProfileEmbedded;
    home: ProfileEmbedded;
    liability: ProfileEmbedded;
    insurance: ProfileEmbedded;
    bank_card: ProfileEmbedded;
    inbox: ProfileEmbedded;
  };

  filled_data_percentage: number;
  outdated_data_percentage: number;
}
