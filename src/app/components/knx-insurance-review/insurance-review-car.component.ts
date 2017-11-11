import { Component, Input, OnInit } from '@angular/core';

import { CarInsurance } from '../../car/models/car-insurance';
import { Tag } from '../../core/models/tag';
import { TagsService } from '../../core/services/tags.service';

@Component({
  selector: 'knx-insurance-review-car',
  template: `
    <knx-ir-content title="Je verzekering" *ngIf="carInsurance">
      <knx-ir-row showTooltip="false" showValue="true">
        <knx-ir-label>Dekking</knx-ir-label>
        <knx-ir-value>{{ getLabel('car_flow_coverage', carInsurance.main_coverage) }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row showTooltip="true" showValue="true">
        <knx-ir-label>Maximaal eigen risico</knx-ir-label>
        <knx-ir-tooltip>
          Dit maximale eigen risico is het bedrag dat voor jouw rekening komt als je de auto laat maken bij een door de verzekeraar
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
            Bij andere aanbieders van verzekeringen kun je tot wel 15% van de premie kwijt zijn aan provisie.<p>
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
        <knx-ir-value>{{ getLabel('car_flow_road_assistance', carInsurance.road_assistance) }}</knx-ir-value>
      </knx-ir-row>

      <knx-ir-row>
        <knx-ir-label>Rechtsbijstand</knx-ir-label>
        <knx-ir-value>{{ getLabel('car_flow_legal_aid', carInsurance.legal_aid) }}</knx-ir-value>
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

  constructor(private tagsService: TagsService) {}

  getLabel(key: string, value: string) {
    return this.tagsService.getTranslationText(key, value);
  }

  showOneOffPremium(): boolean {
    return this.carInsurance.one_off_premium > 0;
  }
}
