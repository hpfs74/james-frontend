import { RoundPipe } from './round.pipe';

describe('Round Number Pipe', () => {
  it('should round number', () => {
    let roundPipe: RoundPipe;
    const testNumber = 33.333;
    roundPipe = new RoundPipe();
    expect(roundPipe.transform(testNumber) % 1).toBe(0);
  });
});
