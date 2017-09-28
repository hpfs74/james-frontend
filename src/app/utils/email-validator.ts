import { FormControl } from '@angular/forms';

export function EmailValidator(c: FormControl) {
  const EMAIL_REGEXP = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)' +
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

  const emailRegex = new RegExp(EMAIL_REGEXP);

  return (emailRegex.test(c.value) || c.value === '') ? null : {
    email: true
  };
}
