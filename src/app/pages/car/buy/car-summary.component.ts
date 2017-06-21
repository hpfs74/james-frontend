import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Profile, Car } from '../../../models';
import { SectionItem, SectionGroup, SectionFields } from '../../../components/knx-insurance-summary/insurance-summary-section';

@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements OnChanges {
  @Input() confirm: boolean;
  @Input() profile: Profile;

  sections: Array<SectionItem>;

  ngOnChanges() {
    if (this.profile) {
      const carInsurance: SectionItem = {
        label: 'Je autoverzekering',
        groups: [
          {
            fields: [
              {
                label: 'Ingangsdatum',
                value: ''
              },
              {
                label: 'Gekozen dekking',
                value: ''
              },
              {
                label: 'Eigen risico',
                value: ''
              }
            ]
          },
          {
            fields: [
              {
                label: 'Rechtsbijstand',
                value: ''
              },
              {
                label: 'No-claim beschermer',
                value: ''
              },
              {
                label: 'Inzittendenverzekering',
                value: ''
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
                value: this.profile._embedded.car.license
              },
              {
                label: 'Merk',
                value: this.profile._embedded.car.make
              },
              {
                label: 'Model',
                value: this.profile._embedded.car.model
              },
              {
                label: 'Type',
                value: this.profile._embedded.car.edition
              },
              {
                label: 'Bouwjaar',
                value: this.profile._embedded.car.year
              }
            ]
          },
          {
            fields: [
              {
                label: 'Cataloguswaarde',
                value: this.profile._embedded.car.price_consumer_incl_vat
              },
              {
                label: 'Waarde accessoires',
                value: 'test'
              },
              {
                label: 'Dagwaarde',
                value: this.profile._embedded.car.current_value
              },
              {
                label: 'Gewicht',
                value: this.profile._embedded.car.weight_empty_vehicle
              },
              {
                label: 'KM per jaar',
                value: 'test'
              },
              {
                label: 'Beveiliging',
                value: 'test'
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
                value: this.profile.gender.toLowerCase() === 'm' ? 'Man' : 'Vrouw'
              },
              {
                label: 'Voorletters',
                value: 'test'
              },
              {
                label: 'Voornaam',
                value: this.profile.firstname
              },
              {
                label: 'Achternaam',
                value: this.profile.lastname
              },
              {
                label: 'Geboortedatum',
                value: this.profile.dateOfBirth
              }
            ]
          },
          {
            fields: [
              {
                label: 'Postcode',
                value: 'test'
              },
              {
                label: 'Huisnummer',
                value: 'test'
              },
              {
                label: 'Mobiel nummer',
                value: 'test'
              },
              {
                label: 'Vast nummer',
                value: 'test'
              },
              {
                label: 'E-mailadres',
                value: 'test'
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
}
