const defaultError = 'De combinatie gebruikersnaam en wachtwoord klopt niet';

export const loginError = {
  inactive_profile: `Je account is nog niet geactiveerd :( Klik in de email op 'activeer'.\n Geen email gehad?`,
  invalid_username: defaultError,
  invalid_password: defaultError,
  too_many_login_attempts: 'Teveel foutieve inlogpogingen',
  default: defaultError
};

export interface CustomError {
  errorText: string;
  hasLink?: boolean;
}
