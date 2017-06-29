import { Component, OnInit, Input, OnChanges } from '@angular/core';

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
    if (this.isValidAdvice(this.advice)) {
      const carInsurance: SectionItem = {
        label: 'Je autoverzekering',
        groups: [
          {
            fields: [
              {
                label: 'Ingangsdatum',
                value: this.advice.startDate
              },
              {
                label: 'Gekozen dekking',
                value: this.advice.coverage
              },
              {
                label: 'Eigen risico',
                value: this.advice.insurance.ownRisk
              }
            ]
          },
          {
            fields: [
              {
                label: 'Rechtsbijstand',
                value: this.advice.insurance.legal_aid
              },
              {
                label: 'No-claim beschermer',
                value: this.advice.insurance.no_claim_protection
              },
              {
                label: 'Inzittendenverzekering',
                value: this.advice.insurance.cover_occupants
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
                value: this.advice._embedded.car.license
              },
              {
                label: 'Merk',
                value: this.advice._embedded.car.make
              },
              {
                label: 'Model',
                value: this.advice._embedded.car.model
              },
              {
                label: 'Type',
                value: this.advice._embedded.car.edition
              },
              {
                label: 'Bouwjaar',
                value: this.advice._embedded.car.year
              }
            ]
          },
          {
            fields: [
              {
                label: 'Cataloguswaarde',
                value: this.advice._embedded.car.price_consumer_incl_vat
              },
              {
                label: 'Waarde accessoires',
                value: this.advice.accessoryValue
              },
              {
                label: 'Dagwaarde',
                value: this.advice._embedded.car.current_value
              },
              {
                label: 'Gewicht',
                value: this.advice._embedded.car.weight_empty_vehicle
              },
              {
                label: 'KM per jaar',
                value: this.advice.insurance.kilometers_per_year
              },
              {
                label: 'Beveiliging',
                value: this.advice.securityClass
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
                value: this.advice.gender.toLowerCase() === 'm' ? 'Man' : 'Vrouw'
              },
              {
                label: 'Voorletters',
                value: this.advice.initials
              },
              {
                label: 'Voornaam',
                value: this.advice.firstname
              },
              {
                label: 'Achternaam',
                value: this.advice.lastname
              },
              {
                label: 'Geboortedatum',
                value: this.advice.date_of_birth
              }
            ]
          },
          {
            fields: [
              {
                label: 'Postcode',
                value: this.advice.address.postcode
              },
              {
                label: 'Huisnummer',
                value: this.advice.address.number
              },
              {
                label: 'Mobiel nummer',
                value: this.advice.address.mobileNumber
              },
              {
                label: 'Vast nummer',
                value: this.advice.address.phoneNumber
              },
              {
                label: 'E-mailadres',
                value: this.advice.address.emailaddress
              }
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
      !this.isEmpty(obj.insurance._embedded['car']) &&
      !this.isEmpty(obj.address));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }
}
