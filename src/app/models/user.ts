import { Address, DashboardItem } from './index';

/**
 * NICCI User Profile
 * @export
 * @class User
 */
export class User {
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

  _id: string;
  _deleted: boolean;
  _embedded: {
    car: DashboardItem;
    travel: DashboardItem;
    content: DashboardItem;
    home: DashboardItem;
    liability: DashboardItem;
    inbox: DashboardItem;
  };

  filled_data_percentage: number;
  outdated_data_percentage: number;
  age: number;

  address?: Address;
}
