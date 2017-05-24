import { Component, OnInit, Input } from '@angular/core';
import { Insurance, Insurer, Rating } from './../../models';

@Component({
  selector: 'knx-insurance-result-detail',
  template: `
    <knx-collapse-panel
      class="knx-insurance-result__details"
      contentHeight="200px"
      openLabel="bekijk details"
      closeLabel="sluit details">
      <div class="col-md-12 pt-0">
        <knx-tabs>
          <knx-tab tabTitle="Kenmerken">
            <h5>Verzekering</h5>
            <p>{{ insurance.insurer.brand }}</p>

            <h5>Product</h5>
            <p>{{ insurance.insurer.product }}
          </knx-tab>
          <knx-tab tabTitle="Details">
          Tab 2 Content
          </knx-tab>
          <knx-tab tabTitle="Reviews">
            <knx-review-summary
              [total]="insurance.insurer.total_rating"
              [reviewCount]="insurance.insurer.reviews"
              [items]="reviewItems">
            </knx-review-summary>
          </knx-tab>
        </knx-tabs>
      </div>
    </knx-collapse-panel>
  `
})
export class InsuranceResultDetailComponent implements OnInit {
  @Input() insurance: Insurance;

  reviewItems: Array<Rating>;

  ngOnInit() {
    this.reviewItems = [
      { label: 'Prijs / kwaliteit', value: this.insurance.insurer.response_rate },
      { label: 'Gebruiksgemak', value: this.insurance.insurer.ease_of_arranging},
      { label: 'Communicatie', value: this.insurance.insurer.ease_of_comunication },
      { label: 'Prijs', value: this.insurance.insurer.price_user_preference },
      { label: 'Reactiesnelheid', value: this.insurance.insurer.response_rate }
    ];
  }

}
