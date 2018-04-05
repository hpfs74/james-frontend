import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';


import { postalCodeMask } from '../../utils/base-form.utils';
import { AddressLookup, Address, AddressSuggestionParams } from '../models';


@Component({
  selector: 'knx-address',
  styleUrls: ['./address.component.scss'],
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription[] = [];

  @Input() addressFormGroup: FormGroup;
  @Input() addressFormConfig: any;
  @Input() validationErrors: any;
  @Input() addressPreview: string;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() combined: string[];

  @Output() onAddressChange: EventEmitter<AddressLookup> = new EventEmitter();
  @Output() onHouseNumberExtensionChange: EventEmitter<AddressLookup> = new EventEmitter();

  mask = postalCodeMask;

  ngOnInit(): void {
    const postalCodeChange$ = this.addressFormGroup.get('postalCode').valueChanges;
    const houseNumberChange$ = this.addressFormGroup.get('houseNumber').valueChanges;
    const houseNumberExtensionChange$ = this.addressFormGroup.get('houseNumberExtension').valueChanges;

    this.subscriptions$.push(
      Observable.combineLatest(postalCodeChange$, houseNumberChange$)
        .filter(combined => combined[0] && combined[1])
        .subscribe((combined) => {
          this.onAddressChange.emit({
            postalCode: combined[0],
            houseNumber: combined[1]
          });
        }),

      houseNumberExtensionChange$
        .subscribe(value =>
          this.onHouseNumberExtensionChange.emit({
            postalCode: this.addressFormGroup.value.postalCode,
            houseNumber: this.addressFormGroup.value.houseNumber,
            houseNumberExtension: value
          })));
  }

  /** remove all subscriptions */
  ngOnDestroy() {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  getErrors(): Array<string> {
    return this.addressFormGroup.errors ?
      Object.keys(this.addressFormGroup.errors).map(error => this.getErrorMessage(error))
      : null;
  }

  getErrorMessage(errorCode: string): string {
    if (this.validationErrors && this.validationErrors[errorCode]) {
      const errorMessage = this.validationErrors[errorCode];

      return (typeof errorMessage === 'string') ?
        errorMessage : errorMessage(errorMessage);
    }
  }
}
