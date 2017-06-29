import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';

import { Profile, Car } from '../../../models';
import { isMobileNumber } from '../../../utils/base-form.utils';
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
                value: moment(value.startDate).format('DD-MM-YYYY')
              },
              {
                label: 'Gekozen dekking',
                value: value.coverage
              },
              {
                label: 'Eigen risico',
                value: value.insurance.own_risk
              }
            ]
          },
          {
            fields: [
              {
                label: 'Rechtsbijstand',
                value: value.insurance.legal_aid
              },
              {
                label: 'No-claim beschermer',
                value: value.insurance.no_claim_protection
              },
              {
                label: 'Inzittendenverzekering',
                value: value.insurance.cover_occupants
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
                value: value.insurance._embedded.car.price_consumer_incl_vat
              },
              {
                label: 'Waarde accessoires',
                value: value.accessoryValue
              },
              {
                label: 'Dagwaarde',
                value: value.insurance._embedded.car.current_value
              },
              {
                label: 'Gewicht',
                value: value.insurance._embedded.car.weight_empty_vehicle
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
                value: moment(value.date_of_birth).format('DD-MM-YYYY')
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
                value: value.address.mobileNumber
              },
              {
                label: 'Vast nummer',
                value: value.address.phoneNumber
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
}
