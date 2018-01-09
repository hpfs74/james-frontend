export class AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expiration_time?: number;
  iat?: number;
  anonymous?: boolean;
}

export class AuthKey {
  public id: string;
  public key: string;
}

export interface Authenticate {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
}

export interface RegistrationPayload {
  emailaddress: string;
  password: string;
  scope?: string;
  redirect_uri?: string;
}


export class RegistrationResult {
  _id: string;
  firstname: string;
  infix: string;
  lastname: string;
  name: string;
  emailaddress: string;
  active: boolean;
}

export interface PasswordPayload {
  old_password: string;
  password: string;
}

export class PasswordChangeResponse {
  active: boolean;
  emailaddress: string;
  id: string;
  last_login: any;
  name: string;
  pin_set: boolean;
  registered: any;
  scope: string[];
}

export class PasswordChangeError {
  error: string;
  error_description: string;
}
