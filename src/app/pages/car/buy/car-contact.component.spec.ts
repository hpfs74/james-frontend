import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { CXFormsModule } from '../../../../../node_modules/@cx/forms';
import { CarContactComponent } from './car-contact.component';
import { ContactDetailForm } from '../../../forms/contact-detail.form';

@Component({
    template : `<div><knx-car-contact-form [form]="formFromHost" [profile]="profileFromHost"></knx-car-contact-form></div>`
})
export class TestHostComponent {
    @ViewChild(CarContactComponent)
    public carContactComponent: CarContactComponent;
    public formFromHost: ContactDetailForm = new ContactDetailForm(new FormBuilder());
    public profileFromHost: any;
}

describe('Component: CarContactComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule],
      declarations: [CarContactComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init the form', () => {
    let element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.carContactComponent).toBeDefined();
    expect(comp.carContactComponent.form).toBeDefined();
  });

  it('should update the form with profile data (ngOnChanges)', () => {
    comp.profileFromHost = {
      firstname: 'John',
      infix: null,
      lastname: 'Doe',
      phone: '0612345678'
    };
    expect(comp.carContactComponent).toBeDefined();
    spyOn(comp.carContactComponent, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();
    expect(comp.carContactComponent.ngOnChanges).toHaveBeenCalled();
    expect(comp.carContactComponent.form.formGroup.get('firstName').value).toEqual('John');
    expect(comp.carContactComponent.form.formGroup.get('lastName').value).toEqual('Doe');
    expect(comp.carContactComponent.form.formGroup.get('mobileNumber').value).toEqual('0612345678');
  });
});
