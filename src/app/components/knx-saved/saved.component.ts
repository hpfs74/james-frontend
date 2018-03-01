import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-saved',
  styleUrls: ['./saved.component.scss'],
  template: `
    <h1 class="col knx-saved__title clearfix">
      {{ title }}
      <div class="knx-saved__title__total">
        <span>totaal:</span>
        {{ getTotalPrice() | currency:'EUR':true }}
      </div>
    </h1>

    <div class="container knx-saved">
      <div class="knx-card">
        <ul class="knx-list--unstyled">
          <li *ngFor="let insurance of insurances?.car?.insurance">
            <div class="row" *ngIf="!insurance.manually_added">
              <div class="pull-left col-md-12">
                <div class="knx-saved__icon pull-left"
                     [ngClass]="{ 'knx-icon-automobile': !insurance.logo, 'knx-saved__icon--image': insurance.logo }">
                  <img *ngIf="insurance.logo" src="{{ insurance.logo }}"/>
                </div>

                <p>
                  <small>Bought via Knab on {{insurance.next_premium_date}}</small>
                  <br>
                  {{insurance.license}} &bull; {{insurance.make}} {{insurance.model}}

                  <br>

                  <strong>{{insurance.insurance_brand || insurance.insurance_name}} &bull;
                    {{insurance.price | currency:'EUR':true }} p/m</strong>

                  <br>

                  <span class="pending" *ngIf="insurance.request_status === 'pending'">(in aanvraag)</span>
                  <span class="approved" *ngIf="insurance.request_status === 'approved'">(aangenomen)</span>
                  <span class="rejected" *ngIf="insurance.request_status === 'rejected'">(verworpen)</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <knx-app-promo-block></knx-app-promo-block>
    </div>
  `
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
