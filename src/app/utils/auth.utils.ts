export class TokenHelper {

  public getTokenExpirationDate(token: string): Number {
    return token ? JSON.parse(token).expiration_time : null;
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

export function isTokenExists(tokenName: string): boolean {
  const token: string = localStorage.getItem(tokenName);
  return !!token;
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
