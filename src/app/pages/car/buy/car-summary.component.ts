import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Profile, Car } from '../../../models';
import { SectionItem, SectionGroup, SectionFields } from '../../../components/knx-insurance-summary/insurance-summary-section';

@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() profile: Profile;
  @Input() car: Car;

  sections: Array<SectionItem>;

  ngOnInit() {
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
              value: this.car.license
            },
            {
              label: 'Merk',
              value: this.car.make
            },
            {
              label: 'Model',
              value: this.car.model
            },
            {
              label: 'Type',
              value: this.car.edition
            },
            {
              label: 'Bouwjaar',
              value: this.car.year
            }
          ]
        },
        {
          fields: [
            {
              label: 'Cataloguswaarde',
              value: this.car.price_consumer_incl_vat
            },
            {
              label: 'Waarde accessoires',
              value: 'test'
            },
            {
              label: 'Dagwaarde',
              value: this.car.current_value
            },
            {
              label: 'Gewicht',
              value: this.car.weight_empty_vehicle
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
