import { CarExtrasForm } from './car-extras.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared.module';
import { CarInfoMessageComponent } from '../../../components/knx-car-info-message/car-info-message.component';
import { CarExtrasComponent } from './car-extras.component';
import { CarService } from '../car.service';
import { AuthHttp } from '../../../services/auth-http.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { LoaderService } from '../../../components/knx-app-loader/loader.service';
import { CarReportingCodeForm } from '../buy/car-reporting-code.form';

@Component({
  template: `<div><knx-car-extras [form]="formFromHost" [show]="true" optionModifierClass="hidden-xs"></knx-car-extras></div>`
})
export class TestHostComponent {
  @ViewChild(CarExtrasComponent)
  public targetComponent: CarExtrasComponent;
  public formFromHost: CarExtrasForm = new CarExtrasForm(
    new FormBuilder(), [
      {
        value: 'SCM5',
        baab: 'baba',
        title: 'Test',
        description: 'This is a description'
      }
    ]);
}

describe('Component: CarExtrasComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      providers: [ AuthHttp, AuthService, LocalStorageService, LoaderService, CarService ],
      declarations: [CarExtrasComponent, CarInfoMessageComponent, TestHostComponent]
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
