import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { setUpTestBed } from './../../../test.common.spec';
import { RegisterPanelComponent } from './register-panel.component';

describe('Component: RegisterPanelComponent', () => {
  let comp: RegisterPanelComponent ;
  let fixture: ComponentFixture<RegisterPanelComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [RegisterPanelComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPanelComponent);
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
