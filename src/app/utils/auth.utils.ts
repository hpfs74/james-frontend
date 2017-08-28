import * as crypto from 'crypto-js';

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
  tokenObj.iat = new Date();
  tokenObj.expiration_time = new Date().setUTCSeconds(tokenObj.expires_in);
  return JSON.stringify(tokenObj);
}

export function tokenNotExpired(tokenName: string): boolean {
  const token: string = localStorage.getItem(tokenName);
  const tokenHelper = new TokenHelper();
  return token !== null && !tokenHelper.isTokenExpired(token);
}

/**
 *
 * @param source
 * @return {any}
 */
export function base64url(source) {
  // Encode in classical base64
  let encodedSource = crypto.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}

/**
 *
 * @param password
 * @param secret
 * @return {string}
 */
export function encryptPassword(password, secret) {
  const header = {'alg': 'HS256', 'typ': 'JWT'};
  const data = password;
  const stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  let signature = encodedHeader + '.' + encodedData;

  signature = crypto.HmacSHA256(signature, secret);
  signature = base64url(signature);
  // TODO: what's the use here of hashing when we return encodedData?
  return encodedHeader + '.' + encodedData + '.' + signature;
}
