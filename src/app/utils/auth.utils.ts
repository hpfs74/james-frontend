import * as crypto from 'crypto-js';

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
