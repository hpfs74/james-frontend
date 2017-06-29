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
  }
}


/**
 * Buy Flow Request Helper
 */
export class CarProposalHelper {
  payload: any;

  propMapping = [
    { key: 'Verzekeraar', value: '' },
    { key: 'Product', value: 'product' },
    { key: 'Geslacht', value: 'gender', transform: (val) => val === 'm' ? 'Man' : 'Vrouw' },
    { key: 'Voorletters', value: 'initials' },
    { key: 'Voornaam', value: 'firstname' },
    { key: 'Voorvoegsels', value: 'infix' },
    { key: 'Achternaam', value: 'lastname' },
    { key: 'Straat', value: 'street'},
    { key: 'Huisnummer', value: 'number'},
    { key: 'Huisnummer toevoeging', value: 'number_extended'},
    { key: 'Postcode', value: 'postcode'},
    { key: 'Woonplaats', value: 'city' },
    { key: 'Geboortedatum', value: 'birthDate'},
    { key: 'Mobiel telefoonnummer', value: 'phone'},
    { key: 'Vast telefoonnummer', value: 'phone'},
    { key: 'Rekeningnummer', value: 'iban', transform: this.removeWhiteSpace },
    { key: 'Betalingstermijn', value: ''},
    { key: 'Emailadres', value: 'email'},
    { key: 'Facebook account', value: ''},
    { key: 'Twitter account', value: ''},
    { key: 'Ingangsdatum', value: 'startDate' },
    { key: 'Kenteken', value: 'license '},
    { key: 'Merk', value: 'make '},
    { key: 'Model', value: 'model '},
    { key: 'Type', value: 'type' },
    { key: 'Bouwjaar', value: 'year' },
    { key: 'Cataloguswaarde', value: 'price_consumer_incl_vat' },
    { key: 'Waarde accessoires', value: 'accessoryValue' },
    { key: 'Dagwaarde', value: 'current_value'},
    { key: 'Gewicht', value: 'weight_empty_vehicle' },
    { key: 'Kilometrage', value: 'kmPerYear', transform: this.getKilomterPerYear },
    { key: 'Beveiliging', value: 'securityClass', transform: (value) => 'SCM klasse ' + value.slice(-1) },
    { key: 'Hoofddekking', value: 'coverage', transform: this.getCoverage },
    { key: 'Rechtsbijstand meeverzekeren', value: 'legal', transform: this.getBoolean },
    { key: 'Inzittenden meeverzekeren', value: 'cover_occupants', transform: this.getBoolean },
    { key: 'Slotvragen', value: '' },
    {
      key: 'Ben jij in de laatste 8 jaar, in aanraking geweest met politie of justitie?',
      value: 'crime',
      transform: this.getBoolean
    },
    {
      key: `Ben jij in de laatste 8 jaar geweigerd of opgezegd door een verzekeraar of betrokken
          (geweest) bij verzekeringsfraude?`,
      value: 'refuse',
      transform: this.getBoolean
    },
    {
      key: `Ben jij in de laatste 5 jaar failliet verklaard of in een schuldsanering betrokken geweest,
            of heeft een deurwaarder momenteel beslag gelegd op jouw inkomsten of bezittingen?`,
      value: 'debt',
      transform: this.getBoolean
    },
    {
      key: `Is jou, de regelmatige bestuurder of kentekenhouder in de laatste 8 jaar de rijbevoegdheid
            (geheel of voorwaardelijk) ontzegd?`,
      value: 'driver',
      transform: this.getBoolean
    },
    {
      key: `Heb jij de laatste 5 jaar schade geleden of veroorzaakt, die gedekt werd door een soortgelijke
            verzekering als je nu aanvraagt?`,
      value: 'crime',
      transform: this.getBoolean
    },
    {
      key: `Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?`,
      value: 'cause',
      transform: this.getBoolean
    }
  ];

  constructor(payload: any) {
    this.payload = payload;
  }

  getItems(): { [id: string]: string } {
    let itemObj = {};
    this.propMapping.forEach((el) => {
      if (this.payload && this.payload.hasOwnProperty(el.value)) {
        itemObj[el.key] = el['transform'] ? el['transform'](this.payload[el.value]) : this.payload[el.value];
      }
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

  private removeWhiteSpace(value: string) {
    return value.replace(/[ _]/gim, '');
  }

  private getKilomterPerYear(kmrType: string) {
    let value: string;

    switch (kmrType.toUpperCase()) {
      case 'KMR1':
        value = '<7.500';
        break;
      case 'KMR2':
        value = '7.500 - 10.000';
        break;
      case 'KMR3':
        value = '10.001 - 12.000';
        break;
      case 'KMR4':
        value = '12.001 - 15.000';
        break;
      case 'KMR5':
        value = '15.001 - 20.000';
        break;
      case 'KMR6':
        value = '20.001 - 25.000';
        break;
      case 'KMR7':
        value = '25.001 - 30.000';
        break;
      case 'KMR8':
        value = '> 30.000';
        break;
      default:
        break;
    }
    return value;
  }
}
