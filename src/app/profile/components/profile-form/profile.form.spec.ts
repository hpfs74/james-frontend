import { FormBuilder } from '@angular/forms';
import { ProfileForm } from './profile.form';
import { TestBed } from '@angular/core/testing';
import { TagsService } from '@app/core/services';
import { TagsServiceMock } from '@app/core/services/tags.service.mock.spec';

describe('Form: Profile', () => {
  let form: ProfileForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TagsService,
          useValue: TagsServiceMock
        },
      ]
    });
    const tagsService = TestBed.get(TagsService);
    form = new ProfileForm(new FormBuilder(), tagsService.getAsLabelValue('insurance_flow_household'));
  });

  it('should initialize the form controls', () => {
    expect(form.formGroup.get('avatar')).toBeDefined();
    expect(form.formGroup.get('gender')).toBeDefined();
    expect(form.formGroup.get('firstName')).toBeDefined();
    expect(form.formGroup.get('lastName')).toBeDefined();
    expect(form.formGroup.get('birthDate')).toBeDefined();
    expect(form.formGroup.get('pushNotifications')).toBeDefined();
    expect(form.formGroup.get('emailNotifications')).toBeDefined();

    expect(form.addressForm).toBeDefined();
    expect(form.addressForm.formGroup).toBeDefined();
  });

  it('should init the form options', () => {
    expect(form.formConfig).toBeDefined();
    expect(form.addressForm.formGroup).toBeDefined();
    expect(Object.keys(form.formConfig).length).toBe(8);
  });

  it('should init validation errors', () => {
    expect(form.validationErrors).toBeDefined();
  });
});
