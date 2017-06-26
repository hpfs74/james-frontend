import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { CarDetailForm } from './car-detail.form';
import { Car, Price, Address } from '../../../models';
import { CarService } from '../car.service';

@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailComponent implements OnInit {
  @Input() form: CarDetailForm;
  @Input() car: Car;
  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
  @Input() isCoverageLoading: boolean;
  @Input() submitted: boolean;

  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();
  @Output() coverageDetailsChange: EventEmitter<any> = new EventEmitter();
  @Output() addressChange: EventEmitter<Address> = new EventEmitter();
  @Output() coverageSelected: EventEmitter<Price> = new EventEmitter();
  @Output() formControlFocus: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private carService: CarService) {
  }

  ngOnInit() {
    let licensePlate = this.form.formGroup.get('licensePlate');
    let loan = this.form.formGroup.get('loan');

    Observable.combineLatest(
      licensePlate.valueChanges,
      loan.valueChanges)
      .subscribe(data => {
        if (licensePlate.valid && loan.valid) {
          this.coverageDetailsChange.emit(this.form.formGroup.value);
        }
      });
  }

  onFocus(controlKey) {
    this.formControlFocus.emit(controlKey);
  }

  onSelectCoverage(coverage: Price) {
    if (coverage.id) {
      this.coverageSelected.emit(coverage);
    }
  }

  onLicensePlateChange(licensePlate: string) {
    const validLength = 6;
    // control valid state is changed externally based on RDC request result,
    // so we use length here to determine validity
    if (licensePlate && licensePlate.length === validLength) {
      this.licensePlateChange.emit(licensePlate);
    }
  }

  onAddressFound(event: Address) {
    this.addressChange.emit(event);
  }
}
