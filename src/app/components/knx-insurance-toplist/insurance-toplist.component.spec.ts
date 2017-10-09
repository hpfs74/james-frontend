import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { InsuranceTopListComponent } from './insurance-toplist.component';

@Component({
  template: `<div><knx-insurance-toplist [initialAmount]="initialAmount" [insurances]="insurances"></knx-insurance-toplist></div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceTopListComponent)
  public testComponent: InsuranceTopListComponent;
  public initialAmount = 4;
  public insurances = [{fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}];
}

describe('Component: InsuranceTopList', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [InsuranceTopListComponent, TestHostComponent],
    imports: [BrowserModule],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize default sorting options', () => {
    fixture.detectChanges();
    expect(comp.testComponent.orderBy.length).toBe(2);
  });

  it('should show all insurances', () => {
    comp.testComponent.total = 0;
    comp.testComponent.showAll();
    fixture.detectChanges();
    expect(comp.testComponent.total).toBeTruthy();
  });

  it ('should show empty insurance list message', () => {
    comp.testComponent.insurances = [];
    fixture.detectChanges();
    expect(comp.testComponent.noResult()).toBeTruthy();
  });

});
