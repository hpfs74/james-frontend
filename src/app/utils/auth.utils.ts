import * as crypto from 'crypto-js';

export class TokenHelper {

  public getTokenExpirationDate(token: string): Date {
    let tokenObj = JSON.parse(token);

    if (!tokenObj.hasOwnProperty('expires_in')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(tokenObj.expires_in);
    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
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

  let header = {'alg': 'HS256', 'typ': 'JWT'};
  let data = password;
  let stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(header));
  let encodedHeader = base64url(stringifiedHeader);
  let stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(data));
  let encodedData = base64url(stringifiedData);
  let signature = encodedHeader + '.' + encodedData;

  signature = crypto.HmacSHA256(signature, secret);
  signature = base64url(signature);

  return encodedHeader + '.' + encodedData + '.' + signature;
}
