import { getRangeConfig } from './slider.util';

describe('Slider Util', () => {
  it('should generate a range of values', () => {
    const ranges = [0, 10, 20, 30, 40];
    expect(getRangeConfig(ranges)).toBeDefined();
  });
});
