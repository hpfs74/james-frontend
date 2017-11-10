import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { KNXHamburgerComponent } from './knx-hamburger.component';


describe('Component: KNXHamburgerComponent', () => {
  let comp: KNXHamburgerComponent;
  let fixture: ComponentFixture<KNXHamburgerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [KNXHamburgerComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(KNXHamburgerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit on hamburger click', () => {
    spyOn(comp.onHamburgerClick, 'emit');
    comp.toggleMenu();
    fixture.detectChanges();
    expect(comp.onHamburgerClick.emit).toHaveBeenCalled();
  });
});
