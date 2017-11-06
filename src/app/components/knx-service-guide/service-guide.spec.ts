import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { ServiceGuideComponent } from './service-guide';

describe('Component: Service Guide', () => {
  let comp: ServiceGuideComponent;
  let fixture: ComponentFixture<ServiceGuideComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [ServiceGuideComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGuideComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be visible by default', () => {
    de = fixture.debugElement.query(By.css('.knx-service-guide'));
    fixture.detectChanges();
    expect(de).toBeNull();
  });

  it('should be visible if attribute is true', () => {
    comp.visible = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-service-guide'));
    el = de.nativeElement;
    expect(de).toBeDefined();
  });
});
