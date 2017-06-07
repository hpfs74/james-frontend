import { OpeningHoursComponent } from './opening-hours.component';

import { NO_ERRORS_SCHEMA, DebugElement, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';


describe('Component: CarContactComponent', () => {
  let fixture: ComponentFixture<OpeningHoursComponent>;
  let comp: OpeningHoursComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule ],
      declarations: [OpeningHoursComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningHoursComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoud provide a default schedule', () => {
    expect(comp.defaultSchedule).toBeDefined();
  });

  it('should be closed on sundays', () => {
    var date = new Date(2017, 6, 11); //11th june 2017
    comp.updateIsOpen(date);
    fixture.detectChanges();
    expect(comp.isOpen).toBeFalsy();
  });

  it('should be closed before 8am', () => {
    var date = new Date(2017, 6, 7, 6, 0, 0); //6th june 2017, 6:00
    comp.updateIsOpen(date);
    fixture.detectChanges();
    expect(comp.isOpen).toBeFalsy();
  });

  it('should be closed after 22pm', () => {
    var date = new Date(2017, 6, 7, 23, 0, 0); //6th june 2017, 23:00
    comp.updateIsOpen(date);
    fixture.detectChanges();
    expect(comp.isOpen).toBeFalsy();
  });

  it('should be open between 8am and 22pm', () => {
    var date = new Date(2017, 6, 7, 9, 0, 0); //6th june 2017, 9:00
    comp.updateIsOpen(date);
    fixture.detectChanges();
    expect(comp.isOpen).toBeTruthy();
  });

});
