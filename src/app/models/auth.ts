export class AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expiration_time?: number;
}

export class AuthKey {
  public id: string;
  public key: string;
}
