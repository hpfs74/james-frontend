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
  });
});
