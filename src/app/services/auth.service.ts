import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import * as forge from 'node-forge';
import uuidv4 from 'uuid/v4';



import { environment } from '../../environments/environment';
import { AuthKey, AuthToken } from '../models/auth';
import * as AuthUtils from '../utils/auth.utils';
import { Profile, Authenticate } from '../models';
import { LocalStorageService } from './localstorage.service';

export interface PayloadAuth {
  access_token: string;
  id: string;
  public_key: string;
  aes_key: string;
  nicci_key: string;
}

@Injectable()
export class AuthService {
  tokenStream: Observable<AuthToken>;
  redirectUrl: string;

  private keyUrl: string;
  private profileUrl: string;
  private tokenUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.keyUrl = environment.james.payloadEncryption.key;
    this.profileUrl = environment.james.payloadEncryption.profile;
    this.tokenUrl = environment.james.payloadEncryption.token;
    this.redirectUrl = window.location.origin;
    this.clientId = environment.james.payloadEncryption.client.id;
    this.clientSecret = environment.james.payloadEncryption.client.secret;

    this.tokenStream = new Observable<AuthToken>((obs: any) => {
      obs.next(this.localStorageService.getToken());
    });
  }

  /**
   * do a hard token reset on the backend, and removes all the local storage vars
   *
   * @return {Observable<R>}
   */
  public logout(): Observable<AuthToken> {
    return this.http.delete(this.tokenUrl, { headers: this.getHeaderWithBearer()})
      .map(x => {
        this.localStorageService.clearToken();
        return x.json();
      });
  }

  /**
   * Do login the user
   * @param {Authenticate} auth
   * @return {Observable<AuthToken>}
   */
  public login(auth: Authenticate): Observable<AuthToken> {

    let auth2: Authenticate = {
      grant_type: 'password',
      username: 'andrei.mobgen+token@gmail.com',
      password: 'Qwerty12',
      scope: 'basic'
    };

    return this.play(environment.james.payloadEncryption.login, auth2)
      .map((res: Response) => res.json());
  }

  /**
   * Refresh the current token
   * @param {string} refreshToken
   * @return {Observable<AuthToken>}
   */
  public refreshToken(refreshToken: string): Observable<AuthToken> {

    const payload = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    return this.play(environment.james.payloadEncryption.token, payload)
      .map((res: Response) => res.json());
  }

  /**
   *
   * @param {string} url
   * @param body
   * @return {Observable<any>}
   */
  private play(url: string, body: any): Observable<any> {

    return this.getPayloadToken()
      .flatMap( (payload) => this.getPayloadKey(payload))
      .flatMap( (payload) => this.getEncryptedNicciKey(payload))
      .flatMap( (payload) => this.doPayloadEncryption(url, payload, body));
  }

  /**
   * check if the user is active??
   *
   * @param {string} email
   */
  public isActive(email: string) {
    // this.getNicciKey()
    //   .flatMap((nicci: AuthKey) => {
    //     const headers = this.getBasicHeaderWithKey(nicci);
    //     return this.http.post(this.keyUrl, {email}, {headers})
    //       .map((res: Response) => res.json());
    //   });
  }

  public isLoggedIn() {
    return AuthUtils.tokenNotExpired('token');
  }

  public resendActivation(email) {
    throw new Error('Not implemented yet');
  }

  // PAYLOAD - STEP1
  private getPayloadToken(): Observable<PayloadAuth> {

    const headers = new Headers();
    headers.append('Authorization', this.getHttpAuthorizationHeader(this.clientId, this.clientSecret));
    const body = {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      scope: 'basic'
    };

    return this.http
      .post(this.tokenUrl, body, {headers: headers})
      .map((res: Response) => res.json())
      .map( body => <PayloadAuth>{ access_token: body.access_token });
  }

  // PAYLOAD - STEP2
  private getPayloadKey(payloadauth: PayloadAuth): Observable<PayloadAuth> {
    const session = uuidv4();
    const headers = new Headers();

    headers.append('Authorization', `Bearer ${payloadauth.access_token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post(environment.james.payloadEncryption.key, `uuid=${session}`, { headers: headers })
      .map((res: Response) => res.json())
      .map( body => <PayloadAuth>Object.assign(payloadauth, {
        id: body.id,
        public_key: body['public']
      }));
  }

  //  STEP 3 - PRIVATE KEY ENCRYPTION
  private getEncryptedNicciKey(payload: PayloadAuth): Observable<PayloadAuth> {

    let key = forge.random.getBytesSync(32);
    let pem = new Buffer(payload.public_key, 'base64').toString('ascii');
    let publicKey = forge.pki.publicKeyFromPem(pem);
    let  encBuffer = publicKey.encrypt(key, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });

    let encrypted = new Buffer(forge.util.encode64(encBuffer), 'base64');

    return Observable.of(Object.assign(payload, { nicci_key: encrypted.toString('base64'), aes_key: key }));
  }

  // STEP 4 - PAYLOAD ENCRYPTION
  private doPayloadEncryption(url: string, payloadAuth: PayloadAuth, payload: any): Observable<any> {

    const headers = new Headers();

    headers.append('Authorization', this.getHttpAuthorizationHeader(this.clientId, this.clientSecret));
    headers.append('Content-Type', 'application/octet-stream; charset=utf-8');
    headers.append('NICCI-Key-ID', payloadAuth.id);
    headers.append('NICCI-Key', payloadAuth.nicci_key);

    const encryptedPayload = this.getAesGcmEncryptedBuffer(payload, payloadAuth.aes_key);
    const blob = new Blob([encryptedPayload]);

    return this.http.post(url, blob, {
      headers: headers,
    });
  }
  /**
   * Get the content for the authorization header
   *
   * @param {string} username
   * @param {string} password
   * @return {string}
   */
  private getHttpAuthorizationHeader(username: string, password: string): string {
    return `Basic ${new Buffer(username + ':' + password).toString('base64')}`;
  }

  /**
   * Get the encrypted object using the AES-256-GCM cipher algorithm
   *
   * @param {any} text - the object to be encrypted
   * @param {Buffer} key - the buffer containing the key
   * @return {Buffer} - the encrypted object [iv, encrypt, tag]
   */
  private getAesGcmEncryptedBuffer(text: any, key: string): Buffer {
    // Initial Vector (random data to do encryption) it must be passed
    // with the return object to perform decryption. Newest accept also
    // a nonce object 12x0
    let iv = forge.random.getBytesSync(12);
    let textToEncrypt = text;

    // Checking if the parameter is string or object
    if (typeof(text) === 'object') {
      textToEncrypt = JSON.stringify(text);
    }

    // encrypt some bytes using GCM mode
    let cipher = forge.cipher.createCipher('AES-GCM', key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(textToEncrypt));
    cipher.finish();

    let ret = Buffer.concat([
      new Buffer(iv, 'binary'),
      Buffer.from(cipher.output.toHex(), 'hex'),
      Buffer.from(cipher.mode.tag.toHex(), 'hex'),
    ]);

    return ret;
  }

  /**
   * Prepare headers for old calls
   *
   * @return {Headers}
   */
  private getHeaderWithBearer(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    headers.set('Cache-Control', 'no-cache');

    return headers;
  }
}
