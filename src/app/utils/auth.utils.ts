import { AuthToken } from '@app/auth/models/auth';

export class TokenHelper {

  public getTokenExpirationDate(token: AuthToken): Number {
    return token ? token.expiration_time : null;
  }

  public tokenIsExpired(token: AuthToken, offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate(token);

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf()));
  }
}

export function setTokenExpirationDate(token: AuthToken): AuthToken {
  let tokenObj: AuthToken = Object.assign({}, token);
  tokenObj.expiration_time = new Date().setUTCSeconds(tokenObj.expires_in);
  tokenObj.iat = new Date().getTime();
  return tokenObj;
}

export function tokenIsValid(): boolean {
  const token: AuthToken = JSON.parse(localStorage.getItem('token')) || null;
  const tokenHelper = new TokenHelper();
  return token !== null && !tokenHelper.tokenIsExpired(token);
}

export function tokenIsAnonymous(): boolean {
  const token: AuthToken = JSON.parse(localStorage.getItem('token')) || null;
  // if token is null for any reason, asume that the user is anonymous
  return token === null || (token && token['anonymous']);
}

// TODO this should be changed later, all translations should go trough one place
export function translatePasswordMessages(errorCode: string): string {
  const errorMapping = {
    'old_password_invalid': 'Je huidige wachtwoord is niet geldig',
    'password_already_used': 'De wijziging is niet gelukt, het wachtwoord kan niet hetzelfde \
    zijn als je vorige 8 wachtwoorden. Verzin alsjeblieft een nieuw wachtwoord',
    'passwords_are_the_same': 'De wijziging is niet gelukt, het wachtwoord kan niet hetzelfde \
     zijn als je vorige 8 wachtwoorden. Verzin alsjeblieft een nieuw wachtwoord'
  };
  return errorMapping[errorCode] ? errorMapping[errorCode] : '';
}
