import { BaseForm } from './base-form';

describe('Class: BaseForm', () => {
  let form = new BaseForm();

  it('should provide an address creator', () => {
    expect(form.createAddress).toBeDefined();
  });

  it('should initialize correctly', () => {
    expect(form.validationSummaryError).toBeDefined();
  });
});
