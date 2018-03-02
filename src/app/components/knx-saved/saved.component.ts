import { Component, Input, Output, EventEmitter } from '@angular/core';
enum insuranceStatus {
  PENDING,
  APPROVED
}
@Component({
  selector: 'knx-saved',
  styleUrls: ['./saved.component.scss'],
  templateUrl: './saved.component.html'
})
export class SavedComponent {
  @Input() title: string;
  @Input() insurances: any;
  @Output() onNewAdvice: EventEmitter<any> = new EventEmitter<any>();
  insuranceStatus = insuranceStatus;
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

  getInsuranceStatus(insurance): insuranceStatus {
    let status = this.insuranceStatus.PENDING;
    switch (insurance.request_status) {
      case 'pending':
        status =  this.insuranceStatus.PENDING;
        break;
      case 'approved':
        status =  this.insuranceStatus.APPROVED;
        break;
      default:
        status =  this.insuranceStatus.PENDING;
        break;
    }
    return status;
  }
}
