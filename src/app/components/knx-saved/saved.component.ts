import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-saved',
  styleUrls: ['./saved.component.scss'],
  templateUrl: './saved.component.html'
})
export class SavedComponent {
  @Input() title: string;
  @Input() insurances: any;
  @Output() onNewAdvice: EventEmitter<any> = new EventEmitter<any>();

  startNewAdvice() {
    this.onNewAdvice.emit();
  }

  getTotalPrice() {
    let totalPrice = 0;

    if (this.insurances) {
      this.insurances.car.insurance.forEach(insurance => {
        if (insurance.status !== 'draft' && insurance.request_status !== 'rejected') {
          totalPrice += insurance.price;
        }
      });
    }

    return totalPrice;
  }
}
