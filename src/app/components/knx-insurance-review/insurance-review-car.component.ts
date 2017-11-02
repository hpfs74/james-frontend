import { Component, Input, OnInit } from '@angular/core';
import { CarInsurance } from '../../car/models/car-insurance';
import { CarUtils } from '../../car/utils/car-utils';

@Component({
  selector: 'knx-insurance-review-car',
  template: `
    <knx-ir-content title="Je verzekering" *ngIf="carInsurance">
      <knx-ir-row showTooltip="false" showValue="true">
        <knx-ir-label>Dekking</knx-ir-label>
        <knx-ir-value>{{ carUtils.getCoverageExtended(carInsurance.main_coverage) }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true">
        <knx-ir-label>Maximaal eigen risico</knx-ir-label>
        <knx-ir-tooltip>
          Dit eigen risico is het bedrag dat voor jouw rekening komt als je de auto laat maken bij een door de verzekeraar
          gekozen schadehersteller. Wil je jouw auto door iemand anders laten maken? Dan geldt een hoger eigen risico.
        </knx-ir-tooltip>
        <knx-ir-value>{{ carInsurance.own_risk | currency:'EUR':true }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true">
        <knx-ir-label>Totaalpremie</knx-ir-label>
        <knx-ir-tooltip>
          <p>Vraag je een verzekering via Knab aan, dan ontvangen wij een percentage van wat jij per maand aan premie
            betaalt. Dat heet ‘provisie’. We krijgen een doorlopende vaste, lage vergoeding van 10 % van de premie,
            zolang de verzekering loopt. Knab Verzekeren kan de provisie zo laag houden, omdat de dienst 100% online is.
            Bij andere aanbieders van verzekeringen kun je tot wel 27,5% van de premie kwijt zijn aan provisie.<p>

          <p><strong>Dus welk bedrag krijgen we dan?</strong><br>
          Als jij 30 euro per maand betaalt voor je autoverzekering bij bijvoorbeeld Nationale Nederlanden,
          dan ontvangen wij € 2,37 ex. btw per maand van de verzekeraar.</p>
        </knx-ir-tooltip>
        <knx-ir-value>{{ carInsurance.monthly_premium | currency:'EUR':true }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true" *ngIf="showOneOffPremium()">
        <knx-ir-label>Eenmalige afsluitkosten</knx-ir-label>
        <knx-ir-tooltip>
          <p>Eenmalige afsluitkosten voor nieuwe klanten van deze verzekering.</p>
        </knx-ir-tooltip>
        <knx-ir-value>{{ carInsurance.one_off_premium | currency:'EUR':true }}</knx-ir-value>
      </knx-ir-row>

    </knx-ir-content>

    <knx-ir-content title="Jouw extra's" *ngIf="carInsurance">
      <knx-ir-row>
        <knx-ir-label>Pechhulp</knx-ir-label>
        <knx-ir-value>{{ carUtils.getRoadAssistance(carInsurance.road_assistance) }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>Rechtsbijstand</knx-ir-label>
        <knx-ir-value>{{ carUtils.getLegalAid(carInsurance.legal_aid) }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>No-claimbeschermer</knx-ir-label>
        <knx-ir-value>{{ carInsurance.no_claim_protection | boolean }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>Inzittendenverzekering</knx-ir-label>
        <knx-ir-value>{{carInsurance.cover_occupants  | boolean }}</knx-ir-value>
      </knx-ir-row>
    </knx-ir-content>
  `
})
export class InsuranceReviewCarComponent {
  @Input() carInsurance: CarInsurance;

  carUtils = CarUtils;

  showOneOffPremium(): boolean {
    return this.carInsurance.one_off_premium > 0;
  }
}
