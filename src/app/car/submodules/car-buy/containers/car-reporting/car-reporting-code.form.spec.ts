import { FormBuilder } from '@angular/forms';
import { CarReportingCodeForm } from './car-reporting-code.form';

describe('Form: CarReportingCodeForm', () => {
  let form: CarReportingCodeForm;
  let mockSecurityClasses = [];

  beforeEach(() => {
    form = new CarReportingCodeForm(new FormBuilder(), mockSecurityClasses);
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('startDate')).toBeDefined();
    expect(form.formGroup.get('reportingCode')).toBeDefined();
    expect(form.formGroup.get('accessoryValue')).toBeDefined();
    expect(form.formGroup.get('securityClass')).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(5);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
    expect(form.validationErrors.required).toBeDefined();
    expect(form.validationErrors.max).toBeDefined();
    expect(form.validationErrors.startDate).toBeDefined();
    expect(form.validationErrors.reportingCode).toBeDefined();
    expect(form.validationErrors.startDateMax).toBeDefined();
  });
});
