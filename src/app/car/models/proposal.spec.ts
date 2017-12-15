import { CarProposalHelper } from './proposal';
import * as TestData from './proposal-data.spec';

describe('CarProposalHelper', () => {
  it('should convert final questions to request format', () => {
    let helper = new CarProposalHelper();
    const data = {
      crime: true,
      crimeComment: 'This is a comment',
      debt: false,
      debtComment: null,
      refuse: false,
      refuseComment: null,
      driver: true,
      driverComment: 'Another comment',
      cause: false,
      causeComment: null,
      register: false,
      registerComment: null
    };

    /* tslint:disable */
    const expected = [
      {
        key: 'Ben jij in de laatste 8 jaar, in aanraking geweest met politie of justitie?',
        value: 'Ja, This is a comment'
      },
      {
        key: `Ben jij in de laatste 8 jaar geweigerd of opgezegd door een verzekeraar of betrokken (geweest) bij verzekeringsfraude?`,
        value: 'Nee'
      },
      {
        key: `Ben jij in de laatste 5 jaar failliet verklaard of in een schuldsanering betrokken geweest, of heeft een deurwaarder momenteel beslag gelegd op jouw inkomsten of bezittingen?`,
        value: 'Nee'
      },
      {
        key: `Is jou, de regelmatige bestuurder of kentekenhouder in de laatste 8 jaar de rijbevoegdheid (geheel of voorwaardelijk) ontzegd?`,
        value: 'Ja, Another comment'
      },
      {
        key: `Heb jij de laatste 5 jaar schade geleden of veroorzaakt, die gedekt werd door een soortgelijke verzekering als je nu aanvraagt?`,
        value: 'Nee'
      },
      {
        key: `Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?`,
        value: 'Nee'
      }
    ];
    /* tslint:enable */

    let result = helper.getFinalQuestions(data);
    let resultItems = helper.getFinalQuestionsItems(result);
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toBe(6);
    expect(result).toEqual(expected);
    expect(resultItems.length).toBe(6);
    expect(Object.keys(resultItems[0])[0]).toEqual(result[0].key);
  });

  it('should convert basic questions to request format', () => {
    let helper = new CarProposalHelper();

    const data = TestData.data;
    const expected = [
      {'Verzekeraar': 'Test Insurance Name'},
      {'Product': 'Personenautoverzekering'},
      {'Geslacht': 'Man'},
      {'Voorletters': 'R.R.'},
      {'Voornaam': 'Test Name'},
      {'Voorvoegsels': 'Test voor'},
      {'Achternaam': 'Test Name'},
      {'Straat': 'Piet Heinstraat'},
      {'Huisnummer': '134'},
      {'Huisnummer toevoeging': 'A-01'},
      {'Postcode': '2518CB'},
      {'Woonplaats': 's-Gravenhage'},
      {'Geboortedatum': '1989-11-11'},
      {'Mobiel telefoonnummer': '0612345678'},
      {'Vast telefoonnummer': ''},
      {'Rekeningnummer': 'NL91ABNA0417164300'},
      {'Betalingstermijn': ''},
      {'Emailadres': 'test@test.com'},
      {'Facebook account': ''},
      {'Twitter account': ''},
      {'Startdatum': '12-12-2020'},
      {'Ingangsdatum': '12-12-2020'},
      {'Kenteken': '01XLXL'},
      {'Merk': 'VOLVO'},
      {'Model': 'V70'},
      {'Type': '2.4 T PRESTIGE LINE'},
      {'Bouwjaar': '2000'},
      {'Cataloguswaarde': '47475'},
      {'Waarde accessoires': '12'},
      {'Dagwaarde': '1030'},
      {'Gewicht': '1630'},
      {'Kilometrage': 'ONBEPERKT'},
      {'Beveiliging': 'SCM klasse 3'},
      {'Hoofddekking': 'Aansprakelijkheid + Volledig casco'},
      {'Rechtsbijstand meeverzekeren': 'Nee'},
      {'Inzittendenverzekering': 'Nee'},
      {'Slotvragen': ''},
      {'Voornaam': 'Test User Name'}
    ];

    let result = helper.getItems(data);
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toBe(38);
    expect(result).toEqual(expected);
  });

  it('[INS-1668] should convert the legal aid', () => {
    let helper = new CarProposalHelper();
    let data = TestData.data;
    data.legal_aid = 'LAY';

    const expected = [
      {'Verzekeraar': 'Test Insurance Name'},
      {'Product': 'Personenautoverzekering'},
      {'Geslacht': 'Man'},
      {'Voorletters': 'R.R.'},
      {'Voornaam': 'Test Name'},
      {'Voorvoegsels': 'Test voor'},
      {'Achternaam': 'Test Name'},
      {'Straat': 'Piet Heinstraat'},
      {'Huisnummer': '134'},
      {'Huisnummer toevoeging': 'A-01'},
      {'Postcode': '2518CB'},
      {'Woonplaats': 's-Gravenhage'},
      {'Geboortedatum': '1989-11-11'},
      {'Mobiel telefoonnummer': '0612345678'},
      {'Vast telefoonnummer': ''},
      {'Rekeningnummer': 'NL91ABNA0417164300'},
      {'Betalingstermijn': ''},
      {'Emailadres': 'test@test.com'},
      {'Facebook account': ''},
      {'Twitter account': ''},
      {'Startdatum': '12-12-2020'},
      {'Ingangsdatum': '12-12-2020'},
      {'Kenteken': '01XLXL'},
      {'Merk': 'VOLVO'},
      {'Model': 'V70'},
      {'Type': '2.4 T PRESTIGE LINE'},
      {'Bouwjaar': '2000'},
      {'Cataloguswaarde': '47475'},
      {'Waarde accessoires': '12'},
      {'Dagwaarde': '1030'},
      {'Gewicht': '1630'},
      {'Kilometrage': 'ONBEPERKT'},
      {'Beveiliging': 'SCM klasse 3'},
      {'Hoofddekking': 'Aansprakelijkheid + Volledig casco'},
      {'Rechtsbijstand meeverzekeren': 'Ja'},
      {'Inzittendenverzekering': 'Nee'},
      {'Slotvragen': ''},
      {'Voornaam': 'Test User Name'}
    ];

    let result = helper.getItems(data);
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toBe(38);
    expect(result).toEqual(expected);
  });

  it('should get the dutch boolean anwer with comment', () => {
    let helper = new CarProposalHelper();
    const value = true;
    const comment = 'hello';
    const noComment = '';

    expect(helper.getCheckAnswer(value, comment)).toEqual('Ja, hello');
    expect(helper.getCheckAnswer(value, noComment)).toEqual('Ja');
  });
});
