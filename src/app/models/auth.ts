//
// import { Observable } from 'rxjs/Observable';
// import { User } from './user';
// /**
//  *
//  */
// export interface IAuthService {
//   getUserProfile() : Observable<User>;
//   signIn(email: string, password: string) : Observable<AuthToken>;
//   isActive(email : string);
//   resendActivation(email:string);
//   forgotPassword(email:string);
// }

export class AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export class AuthKey {
  public id: string;
  public key: string;
}
