import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../models/insurance';

import { Car } from '../../models/car';

@Component({
  selector: 'knx-car-result-form',
  templateUrl: 'car-result.component.html'
})

export class CarResultComponent implements OnInit {
  @Input() insurances: Array<InsuranceAdvice>;
  @Input() car: Car;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  stepAmount: number;
  total: number;
  filterBy: any;

  ngOnInit() {
    this.total = this.stepAmount = 4;
    this.filterBy = [
      { id: 'priceQuality', label: 'prijs / kwaliteit', active: true },
      { id: 'price', label: 'beste prijs', active: false },
      { id: 'all', label: 'alle verzekeringen', active: false }
    ];
  }

  toggleFilter(filter: any) {
    this.filterBy.forEach(filter => {
      filter.active = filter.id === filter.id;
    });
  }

  showMore(): void {
    this.total += this.stepAmount;
  }

  trackInsurance(index, item) {
    return item && item.insurance ? item.insurance.id : undefined;
  }

  selectInsurance(event) {
    this.insuranceSelected$.emit(event);
  }
}
