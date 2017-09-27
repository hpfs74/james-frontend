import { CarExtrasForm } from './car-extras.form';
import { ViewChild, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared.module';
import { CarExtrasComponent } from './car-extras.component';

@Component({
  template: `<div><knx-car-extras [form]="formFromHost" [show]="true" optionModifierClass="hidden-xs"></knx-car-extras></div>`
})
export class TestHostComponent {
  @ViewChild(CarExtrasComponent)
  public targetComponent: CarExtrasComponent;
  public formFromHost: CarExtrasForm = new CarExtrasForm(new FormBuilder());
}

describe('Component: CarExtrasComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      providers: [],
      declarations: [CarExtrasComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.form).toBeDefined();
  });
});
