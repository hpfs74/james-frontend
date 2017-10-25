import { CarUtils } from './car-utils';

describe('Car Utils', () => {
  describe('Security Classes', () => {
    it('should get security class title by value', () => {
      expect(CarUtils.getSecurityClassName('SCM_NONE')).toEqual('Weet ik niet / Geen');
      expect(CarUtils.getSecurityClassName('SCM1')).toEqual('Klasse 1');
      expect(CarUtils.getSecurityClassName('SCM2')).toEqual('Klasse 2');
      expect(CarUtils.getSecurityClassName('SCM3')).toEqual('Klasse 3');
      expect(CarUtils.getSecurityClassName('SCM4')).toEqual('Klasse 4');
      expect(CarUtils.getSecurityClassName('SCM5')).toEqual('Klasse 5');
    });
  });

  describe('Coverage', () => {
    it('should convert coverage values to a label', () => {
      expect(CarUtils.getCoverage('CL')).toEqual('Aansprakelijkheid');
      expect(CarUtils.getCoverage('CLC')).toEqual('Aansprakelijkheid + Beperkt casco');
      expect(CarUtils.getCoverage('CAR')).toEqual('Aansprakelijkheid + Volledig casco');
    });

    it('should return empty value on unknown value', () => {
      expect(CarUtils.getCoverage('')).toEqual('');
    });
  });

  describe('Coverage Extended', () => {
    it('should convert coverage values to car extra type label', () => {
      expect(CarUtils.getCoverageExtended('CL')).toEqual('WA');
      expect(CarUtils.getCoverageExtended('CLC')).toEqual('WA + Beperkt Casco');
      expect(CarUtils.getCoverageExtended('CAR')).toEqual('WA + Volledig Casco (All Risk)');
    });

    it('should return empty value on unknown value', () => {
      expect(CarUtils.getCoverageExtended('')).toEqual('');
    });
  });

  describe('Kilometers per year', () => {
    it('should convert kilometer values', () => {
      expect(CarUtils.getKilometerPerYear('KMR1')).toEqual('7.500 KM of minder');
      expect(CarUtils.getKilometerPerYear('KMR2')).toEqual('7.501 - 10.000');
      expect(CarUtils.getKilometerPerYear('KMR3')).toEqual('10.001 - 12.000');
      expect(CarUtils.getKilometerPerYear('KMR4')).toEqual('12.001 - 15.000');
      expect(CarUtils.getKilometerPerYear('KMR5')).toEqual('15.001 - 20.000');
      expect(CarUtils.getKilometerPerYear('KMR6')).toEqual('20.001 - 25.000');
      expect(CarUtils.getKilometerPerYear('KMR7')).toEqual('25.001 - 30.000');
      expect(CarUtils.getKilometerPerYear('KMR8')).toEqual('30.000 of meer');
    });

    it('should return an empty indicator for unkown value', () => {
      expect(CarUtils.getKilometerPerYear('KMR3232')).toEqual('');
      expect(CarUtils.getKilometerPerYear(null)).toEqual('');
      expect(CarUtils.getKilometerPerYear(undefined)).toEqual('');
    });
  });

  describe('Road assistance', () => {
    it('should return a user friendly road assistance value', () => {
      expect(CarUtils.getRoadAssistance('')).toEqual('Nee');
      expect(CarUtils.getRoadAssistance('RACO')).toEqual('Binnen Nederland');
      expect(CarUtils.getRoadAssistance('RAE')).toEqual('Binnen Europa');
      expect(CarUtils.getRoadAssistance('UNKOWN_VALUE')).toEqual('Nee');
    });
  });

  describe('Legal aid', () => {
    it('should return a user friendly legal aid value', () => {
      expect(CarUtils.getLegalAid('')).toEqual('Nee');
      expect(CarUtils.getLegalAid('LAN')).toEqual('Nee');
      expect(CarUtils.getLegalAid('LAY')).toEqual('Ja');
      expect(CarUtils.getLegalAid('LAE')).toEqual('Ja');
    });
  });

});


