import { BooleanPipe } from './boolean.pipe';

describe('Boolean Pipe', () => {
  it('should change true to string', () => {
    const pipe = new BooleanPipe();
    expect(pipe.transform(true)).toBe('Ja');
  });

  it('should change false to string', () => {
    const pipe = new BooleanPipe();
    expect(pipe.transform(false)).toBe('Nee');
  });
});
