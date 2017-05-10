import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { CXFormComponent, getCXValueAccessor } from '../../../../node_modules/@cx/form';
import * as CXInputMasks from '../../../../node_modules/@cx/input/src/cx-input.masks';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

import { CarDetailForm } from './car-detail.form';
import { Price } from '../../models/price';
import { Address } from '../../models/address';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';


export const carDateMask = {
  mask: [/[0-9]/, /[0-9]/, ' ', '/', ' ', /[0-9]/, /[0-9]/, ' ', '/', ' ', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/],
  guide: true,
  keepCharPositions: false,
  decode: value => {
    const parts = value.replace(/[ _]/gim, '').split('/');

    const day = +parts[0];
    const month = +parts[1] - 1;
    const year = +parts[2];

    if (day > 0 && month >= 0 && year > 999) {
      const date = new Date(year, month, day);

      //check if day or month are not bigger then valid
      //note: in JS new Date(50, 60, 2016) is completely valid
      if (date.getDate() === day && date.getMonth() === month) {
        return date;
      }
    }

    return null;
  },
  pipe: createAutoCorrectedDatePipe('dd / mm / yyyy')
};

@Component({
  selector: 'knx-car-detail-form',
  styleUrls: ['car-detail.component.scss'],
  templateUrl: 'car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  public form: CarDetailForm;
  public CXInputMasks = CXInputMasks;
  public KNXDateMasks = carDateMask;

  @Input() userProfile: any;
  @Input() config: any;
  @Input() coverages: Price[];
  @Input() isCoverageLoading: boolean;

  // notify licenseplate entered
  @Output() licensePlateChange: EventEmitter<string> = new EventEmitter();

  // notify details change to get new coverages
  @Output() coverageDetailsChange: EventEmitter<any> = new EventEmitter();

  // form ready to be submitted
  @Output() formValid: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, elementRef: ElementRef, private chatNotifierService: ChatStreamService ) {
  }

  ngOnInit() {
    this.form = new CarDetailForm(this.fb);
    this.form.formGroup.valueChanges.subscribe(data => {
      this.coverageDetailsChange.emit(data);

      if (this.form.formGroup.valid) {
        this.formValid.emit(this.form.formGroup.value);
      }
    });
  }

  onLicensePlateChange(licensePlate: string) {
    const validLength = 6;
    if (licensePlate && licensePlate.length === validLength) {
      this.licensePlateChange.emit(licensePlate);
    }
  }

  onAddressFound(event: Address) {
    this.chatNotifierService.addTextMessage(`Ik heb je adres gevonden. Woon je op <strong>${event.street} in ${event.city}</strong>?`);
  }
}
