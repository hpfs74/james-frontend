import { getLicenseFormats, getLicenseSideCode, formatLicensePlate } from './licensePlate.util';

describe('Utils: LicensePlate', () => {
  it('should provide valid formats', () => {
    const formats = getLicenseFormats();
    expect(formats).toBeDefined();
    expect(formats.length).toBeGreaterThan(0);
  });

  it('should return the correct sidecodes', () => {
    expect(getLicenseSideCode('XX-99-99')).toEqual(1);
    expect(getLicenseSideCode('99-99-XX')).toBe(2);

    expect(getLicenseSideCode('99-XX-99')).toBe(3);
    expect(getLicenseSideCode('XX-99-XX')).toBe(4);

    expect(getLicenseSideCode('XX-XX-99')).toBe(5);
    expect(getLicenseSideCode('99-XX-XX')).toBe(6);

    expect(getLicenseSideCode('99-XXX-9')).toBe(7);
    expect(getLicenseSideCode('9-XXX-99')).toBe(8);

    expect(getLicenseSideCode('XX-999-X')).toBe(9);
    expect(getLicenseSideCode('X-999-XX')).toBe(10);

    expect(getLicenseSideCode('XXX-99-X')).toBe(11);
    expect(getLicenseSideCode('X-99-XXX')).toBe(12);

    expect(getLicenseSideCode('9-XX-999')).toBe(13);
    expect(getLicenseSideCode('999-XX-9')).toBe(14);
  });

  it('should format licensePlates', () => {
    expect(formatLicensePlate('XX9999', 1)).toEqual('XX-99-99');
    expect(formatLicensePlate('9999XX', 2)).toEqual('99-99-XX');

    expect(formatLicensePlate('99XX99', 3)).toEqual('99-XX-99');
    expect(formatLicensePlate('XX99XX', 4)).toEqual('XX-99-XX');

    expect(formatLicensePlate('XXXX99', 5)).toEqual('XX-XX-99');
    expect(formatLicensePlate('99XXXX', 6)).toEqual('99-XX-XX');

    expect(formatLicensePlate('99XXX9', 7)).toEqual('99-XXX-9');
    expect(formatLicensePlate('9XXX99', 8)).toEqual('9-XXX-99');

    expect(formatLicensePlate('XX999X', 9)).toEqual('XX-999-X');
    expect(formatLicensePlate('X999XX', 10)).toEqual('X-999-XX');

    expect(formatLicensePlate('XXX99X', 11)).toEqual('XXX-99-X');
    expect(formatLicensePlate('X99XXX', 12)).toEqual('X-99-XXX');

    expect(formatLicensePlate('9XX999', 13)).toEqual('9-XX-999');
    expect(formatLicensePlate('999XX9', 14)).toEqual('999-XX-9');
  });

});
