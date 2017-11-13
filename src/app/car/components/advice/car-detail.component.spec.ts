import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../../test.common.spec';

import { SharedModule } from '../../../shared.module';
import { Address } from '../../../address/models';
import { CarDetailForm } from './car-detail.form';
import { CarInfoComponent } from '../../../components/knx-car-info/car-info.component';
import { CarDetailComponent } from './car-detail.component';
import { CarService } from '../../services/car.service';
import { AuthHttp, AuthService } from '../../../auth/services';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { LoaderService } from '../../../components/knx-app-loader/loader.service';
import { AddressForm } from '../../../address/components/address.form';

@Component({
  template: `
    <div>
      <knx-car-detail-form [form]="formFromHost" [addressForm]="addressFormFromHost"></knx-car-detail-form>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarDetailComponent)
  public targetComponent: CarDetailComponent;
  private mockHouseHold = [
    { label: 'Alleen ikzelf', value: 'CHM' }
  ];
  public formFromHost: CarDetailForm = new CarDetailForm(new FormBuilder(), this.mockHouseHold);
  public addressFormFromHost: AddressForm = new AddressForm(new FormBuilder());
}

describe('Component: CarCheckComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [SharedModule],
    providers: [AuthHttp, AuthService, LocalStorageService, LoaderService, CarService],
    declarations: [CarDetailComponent, CarInfoComponent, TestHostComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

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


  describe('bugs', () => {
    it('should handle bugs from INS-928', () => {

      let value = {
        address: {
          postcode: '1016LC',
          number: '30,2'
        },
        number_extended: {
          number_addition: null
        }
      };

      comp.targetComponent.advice = value;
      fixture.detectChanges();

      const postalCodeCtrl = comp.targetComponent.addressForm.formGroup.get('postalCode');
      const houseNumberCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumber');
      const houseNumberExtensionCtrl = comp.targetComponent.addressForm.formGroup.get('houseNumberExtension');

      expect(postalCodeCtrl.value).toBe('1016LC');
      expect(houseNumberCtrl.value).toBe('30');
      expect(houseNumberExtensionCtrl.value).toBe('-2');
    });
  });
});
