import { CarDetailForm } from './car-detail.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
import { CarInfoMessageComponent } from '../../../components/knx-car-info-message/car-info-message.component';
import { CarDetailComponent } from './car-detail.component';
import { CarService } from '../car.service';
import { AuthHttp } from '../../../services/auth-http.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/localstorage.service';
import { LoaderService } from '../../../components/knx-app-loader/loader.service';

@Component({
  template: `
    <div>
      <knx-car-detail-form [form]="formFromHost">
      </knx-car-detail-form>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarDetailComponent)
  public targetComponent: CarDetailComponent;
  public formFromHost: CarDetailForm = new CarDetailForm(new FormBuilder());
}

describe('Component: CarCheckComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      providers: [ AuthHttp, AuthService, LocalStorageService, LoaderService, CarService ],
      declarations: [CarDetailComponent, CarInfoMessageComponent, TestHostComponent]
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

  it('should have invalid form controls on init', () => {
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should contain carinfo licenseplate component', () => {
    const element = fixture.debugElement.query(By.css('knx-input-licenseplate > div > input'));
    expect(element).toBeDefined();
  });

  it('should not display car info if license plate is invalid', () => {
    const element = fixture.debugElement.query(By.css('knx-input-licenseplate > div > input'));
    expect(element).toBeDefined();
    comp.targetComponent.form.formGroup.get('licensePlate').setValue('abc');
    fixture.detectChanges();

    expect(comp.targetComponent.form.formGroup.get('licensePlate').valid).toBeFalsy();

    const elementCarInfo = fixture.debugElement.query(By.css('knx-car-info-message'));
    expect(elementCarInfo).toBeNull();
  });

  xit('should display car info if license plate is invalid', () => {
    const element = fixture.debugElement.query(By.css('knx-input-licenseplate > div > input'));
    expect(element).toBeDefined();
    comp.targetComponent.form.formGroup.get('licensePlate').setValue('gk908t');
    fixture.detectChanges();

    expect(comp.targetComponent.form.formGroup.get('licensePlate').valid).toBeTruthy();

    const elementCarInfo = fixture.debugElement.query(By.css('knx-car-info-message'));
    expect(elementCarInfo).not.toBeNull();
  });

});
