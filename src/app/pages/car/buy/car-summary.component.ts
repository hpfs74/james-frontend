import { toDateFormat } from './../../../utils/base-form.utils';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Profile, Car } from '../../../models';
import * as FormUtils from '../../../utils/base-form.utils';
import { SectionItem, SectionGroup, SectionFields } from '../../../components/knx-data-summary/data-summary';

@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent {
  @Input() confirm: boolean;
  @Input() profile: Profile;
  @Input() set advice(value: any) {
    if (this.isValidAdvice(value)) {
      const carInsurance: SectionItem = {
        label: 'Je autoverzekering',
        groups: [
          {
            fields: [
              {
                label: 'Ingangsdatum',
                value: FormUtils.toDateFormat(value.startDate)
              },
              {
                label: 'Gekozen dekking',
                value: this.getCoverage(value.coverage)
              },
              {
                label: 'Eigen risico',
                value: this.currencyPipe.transform(value.insurance.own_risk, 'EUR', true)
              }
            ]
          },
          {
            fields: [
              {
                label: 'Rechtsbijstand',
                value: this.formatBoolean(value.insurance.legal_aid)
              },
              {
                label: 'No-claim beschermer',
                value: this.formatBoolean(value.insurance.no_claim_protection)
              },
              {
                label: 'Inzittendenverzekering',
                value: this.formatBoolean(value.insurance.cover_occupants)
              }
            ]
          }
        ]
      };

      const carDetails: SectionItem = {
        label: 'Details van je auto',
        groups: [
          {
            fields: [
              {
                label: 'Kenteken',
                value: value.insurance._embedded.car.license
              },
              {
                label: 'Merk',
                value: value.insurance._embedded.car.make
              },
              {
                label: 'Model',
                value: value.insurance._embedded.car.model
              },
              {
                label: 'Type',
                value: value.insurance._embedded.car.edition
              },
              {
                label: 'Bouwjaar',
                value: value.insurance._embedded.car.year
              }
            ]
          },
          {
            fields: [
              {
                label: 'Cataloguswaarde',
                value: this.currencyPipe.transform(value.insurance._embedded.car.price_consumer_incl_vat, 'EUR', true)
              },
              {
                label: 'Waarde accessoires',
                value: this.currencyPipe.transform(value.accessoryValue, 'EUR', true)
              },
              {
                label: 'Dagwaarde',
                value: this.currencyPipe.transform(value.insurance._embedded.car.current_value, 'EUR', true)
              },
              {
                label: 'Gewicht',
                value: value.insurance._embedded.car.weight_empty_vehicle + ' kg'
              },
              {
                label: 'KM per jaar',
                value: value.insurance.kilometers_per_year
              },
              {
                label: 'Beveiliging',
                value: value.securityClass
              }
            ]
          }
        ]
      };

      const personalDetails: SectionItem = {
        label: 'Persoonlijke gegevens',
        groups: [
          {
            fields: [
              {
                label: 'Geslacht',
                value: value.gender.toLowerCase() === 'm' ? 'Man' : 'Vrouw'
              },
              {
                label: 'Voorletters',
                value: value.initials
              },
              {
                label: 'Voornaam',
                value: value.firstName
              },
              {
                label: 'Achternaam',
                value: value.lastName
              },
              {
                label: 'Geboortedatum',
                value: FormUtils.toDateFormat(value.date_of_birth)
              }
            ]
          },
          {
            fields: [
              {
                label: 'Postcode',
                value: value.address.postcode
              },
              {
                label: 'Huisnummer',
                value: value.address.number
              },
              {
                label: 'Mobiel nummer',
                value: value.mobileNumber
              },
              {
                label: 'Vast nummer',
                value: value.phoneNumber
              },
              // TODO: add in contact detail form
              // {
              //   label: 'E-mailadres',
              //   value: value.address.emailaddress
              // }
            ]
          }
        ]
      };

      this.sections = [
        carInsurance,
        carDetails,
        personalDetails
      ];
    }
  }

  sections: Array<SectionItem>;

  constructor(private currencyPipe: CurrencyPipe) { }

  private isValidAdvice(obj: any) {
    return (obj &&
      !this.isEmpty(obj) &&
      !this.isEmpty(obj.insurance) &&
      !this.isEmpty(obj.insurance._embedded) &&
      !this.isEmpty(obj.insurance._embedded.car) &&
      !this.isEmpty(obj.address));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }

  private formatBoolean(value: boolean) {
    return value ? 'Ja' : 'Nee';
  }

  private getCoverage(coverage: string) {
    let value: string;

    switch (coverage) {
      case 'CL':
        value = 'Aansprakelijkheid';
        break;
      case 'CLC':
        value = 'Aansprakelijkheid + Beperkt casco';
        break;
      case 'CAR':
        value = 'Aansprakelijkheid + Volledig casco';
        break;
      default:
        break;
    }
  }
}
