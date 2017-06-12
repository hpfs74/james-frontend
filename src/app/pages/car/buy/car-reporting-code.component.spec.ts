import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { CarReportingCodeComponent } from './car-reporting-code.component';

describe('Component: CarReportingCodeComponent', () => {

  let component: CarReportingCodeComponent;
  let fixture: ComponentFixture<CarReportingCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ CarReportingCodeComponent ]
    });
    fixture = TestBed.createComponent(CarReportingCodeComponent);
    component = fixture.componentInstance;
  });
});
