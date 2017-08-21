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

export interface Authenticate {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
}
