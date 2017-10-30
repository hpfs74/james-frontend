import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setUpTestBed } from './../../../test.common.spec';
import { LoginFormComponent } from '../components/login-form.component';
import { LoginForm } from './login.form';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

describe('Component: LoginFormComponent', () => {
  let comp: LoginFormComponent ;
  let fixture: ComponentFixture<LoginFormComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [LoginFormComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    comp = fixture.componentInstance;
    comp.form = new LoginForm(new FormBuilder());
    fixture.detectChanges();
  });

  it('should initialize the form', () => {
    expect(comp.form.formConfig).toBeDefined();
    expect(Object.keys(comp.form.formConfig).length).toBe(2);
    expect(comp.form.formGroup.get('email')).toBeDefined();
    expect(comp.form.formGroup.get('password')).toBeDefined();
  });

  it('email invalid when empty', () => {
    expect(comp.form.formGroup.get('email').valid).toBeFalsy();
  });

  it('password invalid when empty', () => {
    expect(comp.form.formGroup.get('password').valid).toBeFalsy();
  });

  it('should display error message on wrong email syntax', () => {
    const email = comp.form.formGroup.get('email');
    email.setValue('not-an-email');
    const errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('should have submit button enabled by default', () => {
    const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  it('should emit onLogin on submit', () => {
    spyOn(comp.onLogin, 'emit');

    const email = comp.form.formGroup.get('email');
    const password = comp.form.formGroup.get('password');

    const emailValue = 'test@mail.com';
    const passwordValue = 'Qwerty1234@';

    email.setValue(emailValue);
    password.setValue(passwordValue);

    fixture.detectChanges();
    expect(comp.form.formGroup.valid).toBeTruthy();

    comp.login({
      username: emailValue,
      password: passwordValue
    });
    fixture.detectChanges();

    expect(comp.onLogin.emit).toHaveBeenCalledWith({
      username: emailValue,
      password: passwordValue
    });
  });

  it('should emit resend activation mail with entered email', () => {
    spyOn(comp.onResendActivationMail, 'emit');
    const testEmail = comp.form.formGroup.get('email');
    testEmail.setValue('testemail@gmail.com');
    fixture.detectChanges();
    comp.resendActivationMail();
    fixture.detectChanges();
    expect(comp.onResendActivationMail.emit).toHaveBeenCalledWith(testEmail.value);
  });

  it('should emit passwordReset', () => {
    spyOn(comp.onPasswordReset, 'emit');
    comp.goToPasswordReset();
    fixture.detectChanges();
    expect(comp.onPasswordReset.emit).toHaveBeenCalledWith('passwordReset');
  });
});
