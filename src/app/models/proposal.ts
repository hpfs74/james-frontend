import * as moment from 'moment';
import { Insurance } from './insurance';

/**
 * Buy Flow Request
 *
 * @export
 * @interface Proposal
 */
export interface Proposal {
  proposal: Insurance;
  items: {
    [id: string]: string
  };
}


/**
 * Buy Flow Request Helper
 */
export class CarProposalHelper {
  payload: any;

  /* tslint:disable:max-line-length */
  propMapping = [
    { key: 'Verzekeraar',  value: 'moneyview_id', transform: (val) => val.split(':')[0] },
    { key: 'Product',  value: 'moneyview_id', transform: (val) => val.split(':')[1] },
    { key: 'Geslacht',  value: 'gender', transform: (val) => val === 'm' ? 'Man' : 'Vrouw' },
    { key: 'Voorletters',  value: 'initials' },
    { key: 'Voornaam',  value: 'firstName' },
    { key: 'Voorvoegsels', value:  'infix' },
    { key: 'Achternaam',  value: 'lastName' },
    { key: 'Straat', value: 'address.street'},
    { key: 'Huisnummer',  value: 'address.number'},
    { key: 'Huisnummer toevoeging', value: 'address.number_extended'},
    { key: 'Postcode', value:  'address.postcode'},
    { key: 'Woonplaats', value: 'address.city' },
    { key: 'Geboortedatum', value:  'birthDate'},
    { key: 'Mobiel telefoonnummer', value:  'mobileNumber'},
    { key: 'Vast telefoonnummer', value: 'phoneNumber'},
    { key: 'Rekeningnummer', value: 'iban', transform: this.removeWhiteSpace },
    { key: 'Betalingstermijn', value: ''},
    { key: 'Emailadres', value: 'email'},
    { key: 'Facebook account', value: ''},
    { key: 'Twitter account', value: '' },
    { key: 'Startdatum', value: 'startDate', transform: this.formatDate },
    { key: 'Ingangsdatum', value: 'startDate', transform: this.formatDate },
    // Car
    { key: 'Kenteken',  value: 'car.license' },
    { key: 'Merk',  value: 'car.make' },
    { key: 'Model', value: 'car.model' },
    { key: 'Type', value: 'car.type' },
    { key: 'Bouwjaar', value: 'car.year' },
    { key: 'Cataloguswaarde', value: 'car.price_consumer_incl_vat' },
    { key: 'Waarde accessoires', value: 'accessoryValue' },
    { key: 'Dagwaarde', value: 'car.current_value'},
    { key: 'Gewicht', value: 'car.weight_empty_vehicle' },
    { key: 'Kilometrage', value: 'kilometers_per_year' },
    { key: 'Beveiliging', value: 'securityClass', transform: (value) => 'SCM klasse ' + value.slice(-1) },
    { key: 'Hoofddekking', value: 'coverage', transform: this.getCoverage },
    { key: 'Rechtsbijstand meeverzekeren', value: 'legal', transform: this.getBoolean },
    { key: 'Inzittenden meeverzekeren', value: 'cover_occupants', transform: this.getBoolean },
    { key: 'Slotvragen', value:  '' },
    {
      key: 'Ben jij in de laatste 8 jaar, in aanraking geweest met politie of justitie?',
      value: 'crime',
      transform: this.getBoolean
    },
    {
      key: `Ben jij in de laatste 8 jaar geweigerd of opgezegd door een verzekeraar of betrokken (geweest) bij verzekeringsfraude?`,
      value: 'refuse',
      transform: this.getBoolean
    },
    {

      key: `Ben jij in de laatste 5 jaar failliet verklaard of in een schuldsanering betrokken geweest, of heeft een deurwaarder momenteel beslag gelegd op jouw inkomsten of bezittingen?`,
      value: 'debt',
      transform: this.getBoolean
    },
    {
      key: `Is jou, de regelmatige bestuurder of kentekenhouder in de laatste 8 jaar de rijbevoegdheid (geheel of voorwaardelijk) ontzegd?`,
      value: 'driver',
      transform: this.getBoolean
    },
    {
      key: `Heb jij de laatste 5 jaar schade geleden of veroorzaakt, die gedekt werd door een soortgelijke verzekering als je nu aanvraagt?`,
      value: 'crime',
      transform: this.getBoolean
    },
    {
      key: `Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?`,
      value: 'cause',
      transform: this.getBoolean
    }
  ];
  /* tslint:enable */

  constructor(payload: any) {
    this.payload = payload;
  }

  getItems(data: any): { [id: string]: string } {
    if (!data) {
      return;
    }

    const itemObj = {};
    this.propMapping.forEach((el) => {
      let value;
      if (el.value.indexOf('.') > -1) {
        value = el.value.split('.').reduce((o, i) => o[i], data);
      } else if (data.hasOwnProperty(el.value)) {
        value = data[el.value];
      }
      itemObj[el.key] = el['transform'] ? el['transform'](value) : value;
    });
    return itemObj;
  }

  private getBoolean(value: boolean) {
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

  private formatDate(value: Date) {
    return moment(value).format('DD-MM-YYYY');
  }

  private removeWhiteSpace(value: string) {
    return value.replace(/[ _]/gim, '');
  }
}
