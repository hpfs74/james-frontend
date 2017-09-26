import { EmailValidator } from './email-validator';
import { FormControl } from '@angular/forms';

describe('Util: Email Validator', () => {

  it ('should validate simple email address', () => {
    const c = new FormControl({ value: 'something@something.com'});
    expect(EmailValidator(c)).toBeNull();
  });
});


