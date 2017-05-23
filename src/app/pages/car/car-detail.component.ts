import { BlurForwarderDirective } from './../../directives/blurforwarder.directive';
import {
  Component, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
<<<<<<< HEAD
<<<<<<< HEAD
import 'rxjs/add/observable/combineLatest';
=======
>>>>>>> b7e7ce8... fix(car): fix coverage results and add mock api config
=======
import 'rxjs/add/observable/combineLatest';
>>>>>>> de2c44c... fix(config): change to correct mock api and small mobile fixes

import { CXFormComponent, getCXValueAccessor } from '../../../../node_modules/@cx/form';
import * as CXInputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import * as KNXDateMask from '../../utils/base-form.utils';

import { CarDetailForm } from './car-detail.form';
import { Price } from '../../models/price';
import { Address } from '../../models/address';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { CarService } from './car.service';

@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarDetailComponent implements OnInit {
  public CXInputMasks = CXInputMasks;
  public KNXDateMask = KNXDateMask.birthDateMask;

  @Input() form: CarDetailForm;
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
    private fb: FormBuilder, elementRef: ElementRef,
    private chatNotifierService: ChatStreamService,
    private carService: CarService) {
  }

  ngOnInit() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    this.form = new CarDetailForm(this.fb);
>>>>>>> b7e7ce8... fix(car): fix coverage results and add mock api config
=======
>>>>>>> 55c1574... refactor(app): clean up car component
    let licensePlate = this.form.formGroup.get('licensePlate');
    let loan = this.form.formGroup.get('loan');

    Observable.combineLatest(
      licensePlate.valueChanges,
      loan.valueChanges)
      .subscribe(data => {
<<<<<<< HEAD
        if (licensePlate.valid && loan.valid) {
          this.coverageDetailsChange.emit(this.form.formGroup.value);
        }
      });
=======
          if (licensePlate.valid && loan.valid) {
            this.coverageDetailsChange.emit(this.form.formGroup.value);
          }
    });
>>>>>>> b7e7ce8... fix(car): fix coverage results and add mock api config
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
