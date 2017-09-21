import { LicensePlatePipe } from './licensePlate.pipe';

describe('License Plate Pipe', () => {
  it('should transform license plate', () => {
    let licensePipe: LicensePlatePipe;
    licensePipe = new LicensePlatePipe();
    expect(licensePipe.transform('fcgh94', 6)).toBe('FC-GH-94');
  });
});
