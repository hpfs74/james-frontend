import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { setUpTestBed } from './../../../test.common.spec';
import { LoginActivateComponent } from '../components/login-activate.component';

describe('Component: LoginActivateComponent', () => {
  let comp: LoginActivateComponent ;
  let fixture: ComponentFixture<LoginActivateComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [LoginActivateComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginActivateComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit goToRegister', () => {
    spyOn(comp.onGoToRegister, 'emit');
    comp.goToRegister();
    fixture.detectChanges();
    expect(comp.onGoToRegister.emit).toHaveBeenCalledWith('goToRegister');
  });
});
