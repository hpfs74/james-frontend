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
  public stepAmount: number = 4;
  public insurances = [];
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
    expect(comp.testComponent.orderBy.length).toBe(3);
  });

  it('should show more insurances', () => {
    const increaseAmount = 4;
    comp.testComponent.total = 0;
    comp.stepAmount = increaseAmount;
    comp.testComponent.showMore();
    fixture.detectChanges();
    expect(comp.testComponent.total).toBe(increaseAmount);
  });

});
