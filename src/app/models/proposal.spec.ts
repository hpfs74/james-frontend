import { CarProposalHelper } from './proposal';

describe('CarProposalHelper', () => {
  xit('should convert object to proposal request', () => {

  });

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
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toBe(6);
    expect(result).toEqual(expected);
  });
});
