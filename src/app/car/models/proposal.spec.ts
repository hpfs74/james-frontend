import { CarProposalHelper } from './proposal';

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

    const data = {
      id: 22,
      active_loan: true,
      coverage: 'CAR',
      claim_free_years: 1,
      household_status: 'CHM',
      license: '01XLXL',
      gender: 'M',
      title: 'Dhr.',
      date_of_birth: '1989-11-11',
      zipcode: '2518CB',
      house_number: '45',
      country: 'NL',
      kilometers_per_year: 'ONBEPERKT',
      own_risk: 0,
      cover_occupants: false,
      legal_aid: 'LAN',
      no_claim_protection: false,
      road_assistance: 'RANO',
      insurance_id: 'delta-lloyd-personenautoverzekering',
      address: '2518CB45',
      initials: 'R.R.',
      firstName: 'Test Name',
      middleName: 'Test middle',
      lastName: 'Test Name',
      mobileNumber: '0612345678',
      phoneNumber: null,
      saveToProfile: {},
      reportingCode: '1122',
      accessoryValue: 12,
      securityClass: 'SCM3',
      crime: false,
      crimeComment: null,
      debt: false,
      debtComment: null,
      refuse: false,
      refuseComment: null,
      driver: false,
      driverComment: null,
      cause: false,
      causeComment: null,
      register: false,
      registerComment: null,
      startDate: '12-12-2020',
      iban: 'NL91 ABNA 0417 1643 00',
      _id: 'b6a0s8m5t2pg00e4rhdg',
      postcode: '2518CB',
      number: '45',
      street: 'Piet Heinstraat',
      city: 's-Gravenhage',
      county: 's-Gravenhage',
      province: 'Zuid-Holland',
      fullname: 'Piet Heinstraat 45, s-Gravenhage',
      location: {lat: 52.082280462837, lng: 4.2994553948356},
      moneyview_id: 'Test Insurance Name:Personenautoverzekering',
      advice_item_id: '615cb5f1-12e4-4e62-9a9e-adfaac7ccfa3:6655adc3-1892-4885-a025-dd1b67eae03c',
      type: 'car',
      insurance_name: 'Auto',
      fit: 72.87,
      price_quality: 8.6,
      monthly_premium: 138.75,
      wa_nett: 504.59,
      bonus_malus_step_wa: '7',
      bonus_malus_discount_percentage_wa: '65.00',
      details: 'WAVC',
      price: 138.75,
      main_coverage: 'CAR',
      one_off_premium: 0,
      car_current_value: 1030,
      own_risk_theft: 150,
      own_risk_freechoice: 0,
      additional_products: null,
      product_id: 'delta-lloyd-particulier',
      supported: true,
      firstname: 'fa',
      infix: 'Test voor',
      lastname: 'afda',
      birthday: '1996-12-12',
      emailaddress: 'test@test.com',
      nickname: null,
      profile_image: null,
      needs: null,
      household: null,
      active: true,
      enabled: null,
      last_login: null,
      phone: null,
      pin_set: false,
      number_extended: {number_only: 45, number_letter: '', number_addition: '', number_extension: ''},
      built: 1900,
      size: 58,
      age: 20,
      bsn: null,
      birthplace: null,
      maritalstatus: null,
      maritaldistribution: null,
      education: null,
      smoking: null,
      identification: null,
      identificationNumber: null,
      identificationPlace: null,
      testament: null,
      yearsabroad: null,
      name: 'Test User Name',
      filled_data_percentage: 83,
      outdated_data_percentage: 0,
      user_profile: 'Registered',
      insurance: [],
      bank_card: [],
      insurance_brand: 'Test Insurance Name',
      insurance_logo: 'https://d3cuj82m9z5zxb.cloudfront.net/2c6a89f70e1df5bf4a5cc690bd6c3307/insurers-logos/deltalloyd.png',
      url: 'http://www.deltalloyd.nl/prive/index.jsp',
      car: {
        _id: '01XLXL',
        license: '01XLXL',
        vin: null,
        reporting_code: null,
        year: '2000',
        fuel: 'Benzine',
        fuel_code: 'B',
        secondary_fuel: null,
        color: 'blauw',
        color_code: null,
        secondary_color: null,
        secondary_color_code: null,
        weight_empty_vehicle: 1630,
        price_consumer_excl_vat: 42203,
        price_consumer_incl_vat: 47475,
        make: 'VOLVO',
        model: 'V70',
        technical_type: '2.4 T PRESTIGE LINE',
        wheels: 4,
        top_speed: 210,
        engine_capacity: 2435,
        power_kw: 147,
        edition: '2.4 T PRESTIGE LINE',
        doors: 5,
        current_value: 1030,
        catalog_value: 47475,
        car_date_built: {sec: 961507754, usec: 0},
        acceleration: '86',
        turbo: 'J',
        body: 'Stationwagon',
        gear: 'HAND',
        atl_code: '75453',
        b_weight: 1630,
        e_weight: 1630,
        koetswerk: 'COMBI',
        fuel_1: 'Benzine',
        bpm: 6058,
        load_power: 0,
        t_weight: 2220,
        institution: 'IN044',
        color_1: 'blauw',
        rdw_note: 'volvo',
        company: 'V70',
        cylinders: 5,
        places: 5,
        co2_emissions: -1,
        hybrid: 'N',
        tops_none: 210,
        environment: 250,
        shipping: 385,
        new_bpm_price: 12077,
        new_btw_price: 5272,
        catalog_price: 47475,
        net_catalog_price: 30126,
        datum_price_list: 20000501,
        airbag: 'J',
        cw_rdw: '',
        drive: 'VOORACHTER',
        energy: '',
        car_variant: 'CROSS COUNTRY',
        safety: '',
        info_abs: 'J',
        cruise_ctrl: 'J',
        stability_ctrl: '',
        traction_ctrl: 'J',
        date_shipping: {sec: 1193146154, usec: 0},
        date_last_ascription: {sec: 1502890154, usec: 0},
        park_sensors: '',
        nicci_cartransmission_manual_transmission: 'Handgeschakeld'
      }
    };

    const expected = [
      {'Verzekeraar': 'Test Insurance Name'},
      {'Product': 'Personenautoverzekering'},
      {'Geslacht': 'Man'},
      {'Voorletters': 'R.R.'},
      {'Voornaam': 'Test Name'},
      {'Voorvoegsels': 'Test voor'},
      {'Achternaam': 'Test Name'},
      {'Straat': 'Piet Heinstraat'},
      {'Huisnummer': '45'},
      // should be modified after additional number will be implemented
      {'Huisnummer toevoeging': ''},
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

  it('should get the dutch boolean anwer with comment', () => {
    let helper = new CarProposalHelper();
    const value = true;
    const comment = 'hello';
    const noComment = '';

    expect(helper.getCheckAnswer(value, comment)).toEqual('Ja, hello');
    expect(helper.getCheckAnswer(value, noComment)).toEqual('Ja');
  });
});
