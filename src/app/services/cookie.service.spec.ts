
import { CookieService }  from './cookie.service';

describe('Service: CookieService', () => {
  let service: CookieService;

  beforeEach( () => {
    service = new CookieService();
  });

  it('all method should be defined', () => {
    expect(service).toBeDefined();
    expect(service.check).toBeDefined();
    expect(service.delete).toBeDefined();
    expect(service.deleteAll).toBeDefined();
    expect(service.get).toBeDefined();
    expect(service.getAll).toBeDefined();
    expect(service.set).toBeDefined();
  });

  describe('Cookie check methods', () => {
    it('should return true if cookie is present', () => {
      service.set('test', '1234');
      expect(service.check('test')).toBeTruthy();
    });

    it('should return false if cookie is not preset', () => {
      expect(service.check('notexisting')).toBeFalsy();
    });

    it('should be able to get the list of all the cookies', () => {
      service.set('cook1', '1234');
      service.set('cook2', '5678');
      let ret = service.getAll();
      expect(Object.keys(ret).length).toBeGreaterThan(2);
    });
  });

  describe('Cookie manipulation method', () => {

    it('should return empty string requesting not existing cookie', () => {
      expect(service.get('notexisting')).toBe('');
    });

    xit('should set the correct expire date in days', () => {
      pending();
    });

    xit('should set the correct expire date with a date object', () => {
      pending();
    });

    it('should be able to add a new cookie', () => {
      service.set('cook3', '9999');
      let ret = service.get('cook3');
      expect(ret).toBe('9999');
    });

    it('should be able to remove a cookie', () => {
      service.set('cook4', '1111');
      service.delete('cook4');
      expect(service.check('cook4')).toBeFalsy();
    });

    it ('should be able delete all cookie', () => {
      service.deleteAll();
      let ret = service.getAll();

      expect(Object.keys(ret).length).toBe(0);
    });
  });
});
