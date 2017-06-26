import { Address } from './index';

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

  address?: Address;

  _id: string;
  _deleted: boolean;


  _embedded: any;
  // _embedded: {
  //   car: any;
  //   travel: ProfileEmbedded;
  //   content: ProfileEmbedded;
  //   home: ProfileEmbedded;
  //   liability: ProfileEmbedded;
  //   insurance: ProfileEmbedded;
  //   bank_card: ProfileEmbedded;
  //   inbox: ProfileEmbedded;
  // };

  filled_data_percentage: number;
  outdated_data_percentage: number;
}
