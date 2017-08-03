import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InsuranceTopListComponent } from './insurance-toplist.component';

@Component({
  template: `<div><knx-insurance-toplist [stepAmount]="stepAmount" [insurances]="insurances"></knx-insurance-toplist></div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceTopListComponent)
  public testComponent: InsuranceTopListComponent;
  public stepAmount = 4;
  public insurances = [{fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}, {fit: 100}];
}

describe('Component: InsuranceTopList', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceTopListComponent, TestHostComponent],
      imports: [BrowserModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

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

});
