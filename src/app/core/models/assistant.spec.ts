import { AssistantConfig } from './assistant';

describe('Class: Assistant', () => {
  let config: AssistantConfig;

  beforeEach(() => {
    config = new AssistantConfig();
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

    it('should map coverage types', () => {
      expect(config.car.info.CL).toBeDefined();
      expect(config.car.info.CLC).toBeDefined();
      expect(config.car.info.CAR).toBeDefined();
    });

    it('should have a car not found message', () => {
      expect(config.car.error.carNotFound).toBeDefined();
    });

    it('should have a car check message with insurer brand', () => {
      expect(config.car.buy.check('ASR')).toContain('ASR');
    });

    it('should have a thank you message with an email', () => {
      expect(config.car.buy.finalEmail('hello@mail.com')).toContain('hello@mail.com');
    });
  });
});
