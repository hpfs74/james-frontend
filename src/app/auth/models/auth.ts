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

export class RegistrationAdvice {
  coverage: string;
  insurance: string;
  country: string;
  gender: string;
  own_risk: number;
  date_of_birth: string;
  lastname: string;
  legal_aid: string;
  road_assistance: string;
  house_number: string;
  title: string;
  cover_occupants: boolean;
  no_claim_protection: boolean;
  zipcode: string;
  license: string;
  kilometers_per_year: string;
  household_status: string;
  claim_free_years: number;
  active_loan: boolean;
  firstname: string;
  selected_moneyview_id: string;
  advice_item_id: string;
}
