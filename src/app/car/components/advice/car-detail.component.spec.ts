import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../../node_modules/@cx/forms';

import { SharedModule } from '../../../shared.module';
import { Address } from '../../../address/models';
import { CarDetailForm } from './car-detail.form';
import { CarInfoMessageComponent } from '../../../components/knx-car-info-message/car-info-message.component';
import { CarDetailComponent } from './car-detail.component';
import { CarService } from '../../services/car.service';
import { AuthHttp, AuthService } from '../../../auth/services';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { LoaderService } from '../../../components/knx-app-loader/loader.service';

@Component({
  template: `
    <div><knx-car-detail-form [form]="formFromHost"></knx-car-detail-form></div>`
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
      declarations: [CarDetailComponent, CarInfoMessageComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should only emit a valid active loan', () => {
    spyOn(comp.targetComponent.activeLoanChange, 'emit');

    let nativeElement = fixture.nativeElement;
    let loanCtrl = comp.targetComponent.form.formGroup.get('loan');
    loanCtrl.setValue(true);

    fixture.detectChanges();

    expect(comp.targetComponent.activeLoanChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit a form control key', () => {
    const id = 'my.test.key';
    spyOn(comp.targetComponent.formControlFocus, 'emit');
    comp.targetComponent.onFocus(id);
    fixture.detectChanges();
    expect(comp.targetComponent.formControlFocus.emit).toHaveBeenCalledWith(id);
  });

  it('should emit a selected coverage', () => {
    spyOn(comp.targetComponent.coverageSelected, 'emit');
    const coverageItem = {
      id: 'testId',
      header: 'this is a price item',
      badge: '',
      features: []
    };
    comp.targetComponent.onSelectCoverage(coverageItem);
    fixture.detectChanges();

    expect(comp.targetComponent.coverageSelected.emit).toHaveBeenCalledWith(coverageItem);
  });

  it('should emit an address', () => {
    const address = {
      _id: '2132JK25',
      postcode: '2132JK',
      number: '25',
      street: 'Capellalaan',
      city: 'Hoofddorp',
      county: 'haarlemmermeer',
      province: 'noord_holland',
      fullname: 'Capellalaan 25 2132JK Hoofddorp',
      location: {
        lat: 52.293848662962866,
        lng: 4.705527419663116
      }
    } as Address;
    spyOn(comp.targetComponent.addressChange, 'emit');
    comp.targetComponent.onAddressFound(address);
    fixture.detectChanges();
    expect(comp.targetComponent.addressChange.emit).toHaveBeenCalledWith(address);
  });

});
