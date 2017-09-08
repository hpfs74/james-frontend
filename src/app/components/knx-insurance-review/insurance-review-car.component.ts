import { Component, Input, OnInit } from '@angular/core';
import { CarInsurance } from '../../models/car-insurance';

@Component({
  selector: 'knx-insurance-review-car',
  template: `
    <knx-ir-content title="Je verzekering" *ngIf="carInsurance">
      <knx-ir-row showTooltip="false" showValue="true">
        <knx-ir-label>Dekking</knx-ir-label>
        <knx-ir-value>{{ carInsurance.details }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true">
        <knx-ir-label>Eigen risico</knx-ir-label>
        <knx-ir-tooltip>
          Dit eigen risico is van toepassing als je jouw auto laat maken bij een door de verzekeraar gekozen
          schadehersteller, wil je jouw auto door iemand anders laten maken, dan geldt er een hoger eigen risico.
        </knx-ir-tooltip>
        <knx-ir-value>{{ carInsurance.own_risk | currency:'EUR':true }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true">
        <knx-ir-label>Totaal premie per maand, inclusief 10% provisie van Knab</knx-ir-label>
        <knx-ir-tooltip>
          <p>Vraag je een verzekering via Knab aan, dan ontvangen we een percentage van wat jij per maand aan
          premie betaalt. Dat heet 'provisie'. We krijgen een doorlopende vaste lage vergoeding van 10%
          van de premie, zolang de verzekering loopt. Omdat Knab Verzekeren 100% online is, kunnen we onze
          provisie zo laag houden. Bij andere aanbieders van verzekeringen kun je tot wel 27,5 % van de premie
          kwijt zijn aan provisie.<p>

          <p><strong>Dus welk bedrag krijgen we dan?</strong><br>
          Als jij 30 euro per maand betaalt voor je autoverzekering bij bijvoorbeeld Nationale Nederlanden,
          dan ontvangen wij € 2,37 ex. btw per maand van de verzekeraar.</p>
        </knx-ir-tooltip>
        <knx-ir-value>{{ carInsurance.monthly_premium | currency:'EUR':true }}</knx-ir-value>
      </knx-ir-row>

    </knx-ir-content>

    <knx-ir-content title="Jouw extra's">
      <knx-ir-row>
        <knx-ir-label>Pechhulp</knx-ir-label>
        <knx-ir-value>{{carInsurance.road_assistance}}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>Rechtsbijstand</knx-ir-label>
        <knx-ir-value>{{carInsurance.legal_aid}}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>No-claim beschermer</knx-ir-label>
        <knx-ir-value>{{carInsurance.no_claim_protection ? 'Ja' : 'Nee'}}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>Inzittenden verzekering</knx-ir-label>
        <knx-ir-value>{{carInsurance.cover_occupants ? 'Ja' : 'Nee'}}</knx-ir-value>
      </knx-ir-row>
    </knx-ir-content>
  `
})
export class InsuranceReviewCarComponent {
  @Input() carInsurance: CarInsurance;
}
