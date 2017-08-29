import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InsuranceAdvice } from '../../models';
import { CarInsurance } from '../../models/car-insurance';

interface SectionsItem {
  label: string;
  fields: Array<SectionFields>;
}

interface SectionFields {
  label: string;
  value?: number | string;
  info?: string;
}

@Component({
  selector: 'knx-insurance-review',
  template: `
    <div *ngIf="selectedInsurance">
      <h2 class="knx-insurance-review__header">
        Controleer je gegevens
        <img class="knx-insurance-review__logo" src="{{ selectedInsurance?._embedded?.insurance?.insurance_logo }}">
      </h2>
    </div>

    <p class="knx-collapsible-panel__title">
      {{info.label}}

      <knx-info size="md" isFloating="true" class="knx-info">
        <div class="knx-info__content">
          <div class="knx-message knx-message--chat knx-message--arrow-top">
            <div class="knx-message__content" [innerHTML]="info.text"></div>
          </div>
        </div>
      </knx-info>
    </p>

    <knx-collapsible-panel *ngFor="let section of sections" title="{{section.label}}">
      <div class="knx-collapsible-panel__content">
        <div class="row" *ngFor="let sectionField of section.fields">
          <div class="col" [ngClass]="{'col-md-5': sectionField.value, 'col-md-12': !sectionField.value}">
            <span [innerHTML]="sectionField.label"></span><span *ngIf="sectionField.info">
              <knx-info size="md" isFloating="true" class="knx-info">
                <div class="knx-info__content">
                  <div class="knx-message knx-message--chat knx-message--arrow-top">
                    <div class="knx-message__content" [innerHTML]="sectionField.info"></div>
                  </div>
                </div>
              </knx-info>
            </span>
          </div>
          <div class="col col-md-5">
            {{sectionField.value}}
          </div>
        </div>
      </div>
    </knx-collapsible-panel>
  `
})
export class InsuranceReviewComponent implements OnChanges, OnInit {
  @Input() selectedInsurance: CarInsurance;
  sections: Array<SectionsItem>;
  info: any;
  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.info = {
      label: 'Slim verzekerd via Knab',
      text: 'WAAROM VERZEKEREN VIA KNAB? <br>' +
      'Verzekeren via Knab is een goed idee want:<br>' +
      'Scherpe prijs: bij Knab betaal je namelijk maar 10% provisie. Bij andere aanbieders is dat tot wel 25% per maand.<br>' +
      'We zijn er voor je: we helpen je bij schade, of als je er niet uitkomt met je verzekeraar.<br>' +
      'Gemak: je regelt alles voor je verzekeringen heel eenvoudig in de app. Zoals je gegevens aanpassen, of je ' +
      'vraag aap’en aan de Knab Servicedesk.<br>' +
      'Slim: loopt je verzekering bijna af en kun je kijken voor een betere deal? Dan krijg je een seintje van ons. ' +
      'Zodat je altijd slim en voordelig verzekerd bent.'
    };
  }

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
              value: this.currencyPipe.transform(this.selectedInsurance.own_risk, 'EUR', true),
              info: 'Dit eigen risico is van toepassing als je jouw auto aat maken bij een door de verzekeraar gekozen ' +
              'schadehersteller, wil je jouw auto door iemand anders laten maken, dan geldt er een hoger eigen risico.'
            },
            {
              label: 'Totaal premie per maand, inclusief 10% provisie van Knab',
              value: this.currencyPipe.transform(this.selectedInsurance.monthly_premium, 'EUR', true),
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
              value: this.currencyPipe.transform(this.selectedInsurance.one_off_premium, 'EUR', true)
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
        },
        {
          label: 'Documenten',
          fields: [
            {
              label: 'Hier vind je de voorwaarden van de verzekeringen die je hebt gekozen',
              info: 'MEER INFORMATIE <br>' +
              'In de documenten staan de polisvoorwaarden. Daarin lees je bijvoorbeeld waar je precies voor gedekt bent, ' +
              'welke vergoeding je ontvangt bij een schade en of je een vrije keuze hebt voor het bedrijf dat je schade ' +
              'gaat herstellen. <br>' +
              'In de documentlijst staan ook de voorwaarden voor extra dekkingen. Heb je die niet geselecteerd? ' +
              'Dan kun je die natuurlijk negeren.'
            },
            {
              label: '<a href="' + this.selectedInsurance.terms_conditions_pdf_url + '" class="knx-button--util">' +
              'Voorwaarden Autoverzekering</a>'
            }
          ]
        }
      ];

      this.selectedInsurance.documents.forEach((document) => {
        this.sections[this.sections.length - 1].fields.push({
          label: '<a href="' + document.url + '" class="knx-button--util">' + document.name + '</a>'
        });
      });
    }
  }
}

