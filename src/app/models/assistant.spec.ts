import { AssistantConfig, AppAssistantConfig } from './assistant';

describe('Class: Assistant', () => {
  let config: AssistantConfig;

  beforeEach(() => {
    config = new AppAssistantConfig();
  });

  it('should create an address message', () => {
    const expected = 'Ik heb je adres gevonden. Woon je op <strong>Molenstraat in Ossendrecht</strong>?';
    expect(config).toBeDefined();
    expect(config.generic.address({
      '_id': '4641BB71',
      'postcode': '4641BB',
      'number': '71',
      'street': 'Molenstraat',
      'city': 'Ossendrecht',
      'county': 'Woensdrecht',
      'province': 'Noord-Brabant',
      'fullname': 'Molenstraat 71, Ossendrecht',
      'location': {
        'lat': 51.392211711345,
        'lng': 4.3359184058694
      },
      'built': 1955,
      'house_size': 96,
      'house_value': 0,
      'house_info_roof_condition_text': 'Onbekend',
      'house_info_house_type_text': '',
      'house_info_house_use_text': 'residence',
      'number_extended': {
        'number_only': 71,
        'number_addition': ''
      },
      'rooms': 0,
      'build_type': '',
      'isolation_glass': false,
      'house_type': '',
      'house_subtype': null
    })).toEqual(expected);
  });

  describe('Car messages:', () => {
    it('should create a welcome message', () => {
      expect(config.car.welcome).toBeDefined();
    });

    it('should create a coverage message', () => {
      const expected = 'Op basis van je situatie adviseer ik een <strong>goede dekking</strong>';
      expect(config.car.info.coverage.advice({ id: '', badge: '', features: [], header: 'goede' }))
        .toBe(expected);
    });
  });
});
