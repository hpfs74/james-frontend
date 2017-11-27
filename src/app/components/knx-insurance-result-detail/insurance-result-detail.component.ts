import { Component, OnInit, Input } from '@angular/core';
import { Insurer } from '../../insurance/models';
import { Rating } from '../../shared/models';

@Component({
  selector: 'knx-insurance-result-detail',
  styleUrls: ['./insurance-result-detail.component.scss'],
  template: `
    <!-- TODO: migrate to knx-collapsible-panel from @knx package -->
    <!--<knx-collapse-panel
      class="knx-insurance-result__details"
      contentHeight="200px"
      openLabel="bekijk details"
      closeLabel="sluit details">
      <div class="col-md-12 pt-0">
        <knx-tabs>
          <knx-tab title="Kenmerken">
            <h5>Verzekering</h5>
            <p>{{ insurer.brand }}</p>

            <h5>Product</h5>
            <p>{{ insurer.product }}
          </knx-tab>
          <knx-tab title="Details">
            Tab 2 Content
          </knx-tab>
          <knx-tab title="Reviews">
            <knx-review-summary
              [total]="insurer.total_rating"
              [reviewCount]="insurer.reviews"
              [items]="reviewItems">
            </knx-review-summary>
          </knx-tab>
        </knx-tabs>
      </div>
    </knx-collapse-panel>-->
  `
})
export class InsuranceResultDetailComponent implements OnInit {
  @Input() insurer: Insurer;

  reviewItems: Array<Rating>;

  ngOnInit() {
    this.reviewItems = [
      { label: 'Prijs / kwaliteit', value: this.insurer.response_rate },
      { label: 'Gebruiksgemak', value: this.insurer.ease_of_arranging},
      { label: 'Communicatie', value: this.insurer.ease_of_comunication },
      { label: 'Prijs', value: this.insurer.price_user_preference },
      { label: 'Reactiesnelheid', value: this.insurer.response_rate }
    ];
  }

}
