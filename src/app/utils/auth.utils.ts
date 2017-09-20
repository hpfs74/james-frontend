export class TokenHelper {

  public getTokenExpirationDate(token: string): Number {
    return JSON.parse(token).expiration_time;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate(token);

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf()));
  }
}

export function setTokenExpirationDate(token: string): string {
  let tokenObj = JSON.parse(token);
  tokenObj.expiration_time = new Date().setUTCSeconds(tokenObj.expires_in);
  tokenObj.iat = new Date().getTime();
  return JSON.stringify(tokenObj);
}

export function tokenNotExpired(tokenName: string): boolean {
  const token: string = localStorage.getItem(tokenName);
  const tokenHelper = new TokenHelper();
  return token !== null && !tokenHelper.isTokenExpired(token);
}
