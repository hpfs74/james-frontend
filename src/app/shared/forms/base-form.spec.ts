import { BaseForm } from './base-form';

describe('Class: BaseForm', () => {
  const form = new BaseForm();

  it('should initialize correctly', () => {
    expect(form.validationSummaryError).toBeDefined();
  });
});
