import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { UserGreetingComponent } from './user-greeting.component';

describe('Component: SidePanel', () => {
  let comp: UserGreetingComponent;
  let fixture: ComponentFixture<UserGreetingComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [UserGreetingComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);


  beforeEach(() => {
    fixture = TestBed.createComponent(UserGreetingComponent);
    comp = fixture.componentInstance;
  });

  it('should return a morning greeting', () => {
    const hour = 6;
    expect(comp.getGreeting(hour)).toContain('Goedemorgen');
  });

  it('should return a afternoon greeting', () => {
    const hour = 13;
    expect(comp.getGreeting(hour)).toContain('Goedemiddag');
  });

  it('should return a evening greeting', () => {
    const hour = 22;
    expect(comp.getGreeting(hour)).toContain('Goedenavond');
  });

  it('should return a night greeting', () => {
    const hour = 2;
    expect(comp.getGreeting(hour)).toContain('Goedenacht');
  });

  it('should handle an unkown or undefined hour', () => {
    const hour = -3;
    expect(comp.getGreeting(hour)).toContain('Hallo');

    const hour2 = null;
    expect(comp.getGreeting(hour2)).toContain('Hallo');
  });

});
