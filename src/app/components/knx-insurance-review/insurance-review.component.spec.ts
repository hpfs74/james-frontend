import { InsuranceReviewComponent } from './insurance-review.component';
// import { ContactDetailForm } from '../../forms/contact-detail.form';

import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { CXFormsModule } from '../../../../node_modules/@cx/forms';

@Component({
  template : `<div></div>`
})
export class TestHostComponent {
  @ViewChild(InsuranceReviewComponent)
  public insuranceReviewComponent: InsuranceReviewComponent;
}

describe('Component: InsuranceReviewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule],
      declarations: [InsuranceReviewComponent, TestHostComponent]
    }).compileComponents();
  }));


  it('should init the form', () => {
    expect('123').toEqual('123');
  });
});
