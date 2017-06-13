import { licensePlateMask } from './licenseplate.mask';

describe('Mask: Licenseplate', () => {
  it('should have a mask of 8 characters', () => {
    expect(licensePlateMask.mask).toBeDefined();
    expect(licensePlateMask.mask.apply('').length).toBe(8);
  });

  it('should provide a decode function', () => {
    expect(licensePlateMask.decode).toBeDefined();
    expect(licensePlateMask.decode('AB-C-D')).toEqual('ABCD');
    expect(licensePlateMask.decode('ab-c-d')).toEqual('ABCD');
    expect(licensePlateMask.decode('a b -c-d')).toEqual('ABCD');
  });

  it('should provide a pipe function', () => {
    expect(licensePlateMask.pipe).toBeDefined();
    expect(licensePlateMask.pipe('abc')).toEqual('ABC');
  });

  it('should not have a guide', () => {
    expect(licensePlateMask.guide).toBeFalsy();
  });
});
