import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Profile, Car } from '../../../models';
import { isMobileNumber } from '../../../utils/base-form.utils';
import { SectionItem, SectionGroup, SectionFields } from '../../../components/knx-insurance-summary/insurance-summary-section';

@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements OnChanges {
  @Input() confirm: boolean;
  @Input() profile: Profile;
  @Input() formData: any;
// "{
//   "initials":"T.V.",
//   "firstName":"Lloyd",
//   "middleName":null,
//   "lastName":"Miner",
//   "mobileNumber":null,
//   "phoneNumber":null,
//   "saveToProfile":{},

//   "reportingCode":"2345",
//   "accessoryValue":66,
//   "securityClass":"SCM1",
//   "bankruptcy":"noBankruptcy",
//   "debt":"noDebt",
//   "refuse":"wasRefuse",
//   "driver":"notDriver",
//   "cause":"noCause",
//   "register":
//   "notRegistered",
//   "startDate": "2017-06-29T22:00:00.000Z",
//   "iban":"NL39 RABO 0300 0652 64",
//   "acceptConditions":{}}"

  sections: Array<SectionItem>;

  ngOnChanges() {
    if (this.profile && this.isValid(this.profile)) {
      const carInsurance: SectionItem = {
        label: 'Je autoverzekering',
        groups: [
          {
            fields: [
              {
                label: 'Ingangsdatum',
                value: this.formData.startDate
              },
              {
                label: 'Gekozen dekking',
                value: this.formData.coverage
              },
              {
                label: 'Eigen risico',
                value: this.formData.ownRisk
              }
            ]
          },
          {
            fields: [
              {
                label: 'Rechtsbijstand',
                value: '' //this.formData.extraOptions
              },
              {
                label: 'No-claim beschermer',
                value: '' //this.formData.extraOptions
              },
              {
                label: 'Inzittendenverzekering',
                value: '' //this.formData.extraOptions
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
                value: this.formData.accessoryValue
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
                value: this.formData.kmPerYear
              },
              {
                label: 'Beveiliging',
                value: this.formData.securityClass
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
                value: this.formData.initials
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
                value: this.profile.address.postcode
              },
              {
                label: 'Huisnummer',
                value: this.profile.address.number
              },
              {
                label: 'Mobiel nummer',
                value: this.formData.mobileNumber
              },
              {
                label: 'Vast nummer',
                value: this.formData.phoneNumber
              },
              {
                label: 'E-mailadres',
                value: this.profile.emailaddress
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

  private isValid(profile: Profile) {
    //TODO: make (address) data from first advice step available here
    // console.log(this.isEmpty(profile));
    // console.log(this.isEmpty(profile.address));
    // console.log(this.isEmpty(profile._embedded.car));

    return !(this.isEmpty(profile) || this.isEmpty(profile.address) || this.isEmpty(profile._embedded.car));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }
}
