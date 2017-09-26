import { EmailValidator } from './email-validator';
import { FormControl } from '@angular/forms';

describe('Util: Email Validator', () => {
  let expectValid = (email) => {
    const c = new FormControl();
    c.setValue(email);
    expect(EmailValidator(c)).toBeNull();
  };

  let expectInvalid = (email) => {
    const c = new FormControl();
    c.setValue(email);
    const result = EmailValidator(c);
    expect(result).not.toBeNull();
    expect(result.email).toBeTruthy();
  };

  it ('should validate simple email address', () => {
    expectValid('something@something.com');
    expectValid('someone@do-ma-in.com');
    expectValid('wo.oly@example.com');
  });

  it ('should not validate email with spaces', () => {
    expectInvalid('a @p.com');
    expectInvalid('a@p.com ');
    expectInvalid(' a@p.com ');
  });

  it('should not validate email with wrong character', () => {
    expectInvalid('someone@somewhere_com');
    expectInvalid('someone@somewhere.com@');
    expectInvalid('\\"testblah\\"@example.com');
    expectInvalid('\\"\\"test\\blah\\"\\"@example.com"');
    expectInvalid('someone@somewhere.com.');
  });
});
