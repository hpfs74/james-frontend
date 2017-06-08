import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceAdvice } from '../../models/insurance';
import { CarInsurance } from '../../models/car-insurance';

interface SectionsItem {
  label: string;
  fields: Array<SectionFields>;
}

interface SectionFields {
  label: string;
  value: number | string;
  info?: string;
}

@Component({
  selector: 'knx-insurance-review',
  template: `
    <div *ngIf="selectedInsurance">
      <h2 class="knx-insurance-review__header">
        {{selectedInsurance._embedded.insurance.insurance_brand}}
        <img class="knx-insurance-review__logo" src="{{ selectedInsurance._embedded.insurance.insurance_logo}}">
      </h2>
    </div>

    <knx-collapsible-panel [showStep]="false" *ngFor="let section of sections" title="{{section.label}}">
      <div class="knx-collapsible-panel__content" *ngFor="let sectionField of section.fields">
        {{sectionField.label}}<span *ngIf="sectionField.info">
            <knx-info size="md" isFloating="true" class="knx-info">
            <div class="knx-info__content">
              <div class="knx-message knx-message--hint knx-message--arrow-top">
                <div class="knx-message__content" [innerHTML]="sectionField.info"></div>
              </div>
            </div>
          </knx-info></span>: <strong>{{sectionField.value}}</strong>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceReviewComponent implements OnChanges {
  @Input() selectedInsurance: CarInsurance;
  sections: Array<SectionsItem>;

  ngOnChanges() {
    if (this.selectedInsurance) {
      this.sections = [
        {
          label: 'Je verzekering',
          fields: [
            {
              label: 'Dekking',
              value: this.selectedInsurance.details
            },
            {
              label: 'Eigen risico',
              value: '€ ' + this.selectedInsurance.own_risk,
              info: 'Dit eigen risico is van toepassing als je jouw auto aat maken bij een door de verzekeraar gekozen ' +
              'schadehersteller, wil je jouw auto door iemand anders laten maken, dan geldt er een hoger eigen rlslco.'
            },
            {
              label: 'Totaal premie per maand, inclusief 10% provisie van Knab',
              value: '€ ' + this.selectedInsurance.monthly_premium,
              info: 'Vraag je een verzekering via Knab aan, dan ontvangen we een percentage van wat jij per maand aan ' +
              'premie betaalt. Dat heet \'provisie\'. We krijgen een doorlopende vaste lage vergoeding van 10% ' +
              'van de premie, zolang de verzekering loopt. Omdat Knab Verzekeren 100% online is, kunnen we onze ' +
              'provisie zo laag houden. Bij andere aanbieders van verzekeringen kun je tot wel 27,5 % van de premie ' +
              'kwijt zijn aan provisie. <br><b>Dus welk bedrag krijgen we dan?</b><br>Als jij 30 euro per maand ' +
              'betaalt voor je autoverzekering bij bijvoorbeeld Nationale Nederlanden, dan ontvangen wij € 2,37 ex. ' +
              'btw per maand van de verzekeraar.'
            },
            {
              label: 'Eenmalige afsluitkosten',
              value: '€ ' + this.selectedInsurance.one_off_premium
            }
          ]
        },
        {
          label: 'Jouw extra\'s',
          fields: [
            {
              label: 'Pechhulp',
              value: this.selectedInsurance.road_assistance
            },
            {
              label: 'Rechtsbijstand',
              value: this.selectedInsurance.legal_aid
            },
            {
              label: 'No-claim beschermer',
              value: this.selectedInsurance.no_claim_protection ? 'Ja' : 'Nee'
            },
            {
              label: 'Inzittenden verzekering',
              value: this.selectedInsurance.cover_occupants ? 'Ja' : 'Nee'
            }
          ]
        }
      ];
    }
  }
}

