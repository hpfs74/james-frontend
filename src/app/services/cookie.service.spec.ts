
import { CookieService }  from './cookie.service';

describe('Service: CookieService', function () {
  let service: CookieService;

  beforeEach( () => {
    service = new CookieService();
  });

  it('all method should be defined', function() {
    expect(service).toBeDefined();
    expect(service.check).toBeDefined();
    expect(service.delete).toBeDefined();
    expect(service.deleteAll).toBeDefined();
    expect(service.get).toBeDefined();
    expect(service.getAll).toBeDefined();
    expect(service.set).toBeDefined();
  });

  describe('Cookie check methods', function () {
    it('should return true if cookie is present', function () {
      service.set('test', '1234');
      expect(service.check('test')).toBeTruthy();
    });

    it('should return false if cookie is not preset', function () {
      expect(service.check('notexisting')).toBeFalsy();
    });

    it('should be able to get the list of all the cookies', function () {
      service.set('cook1', '1234');
      service.set('cook2', '5678');
      let ret = service.getAll();
      expect(Object.keys(ret).length).toBeGreaterThan(2);
    });
  });

  describe('Cookie manipulation method', function() {

    it('should return empty string requesting not existing cookie', function() {
      expect(service.get('notexisting')).toBe('');
    });

    it('should set the correct expire date in days', function() {
      pending();
    });

    it('should set the correct expire date with a date object', function () {
      pending();
    });

    it('should be able to add a new cookie', function() {
      service.set('cook3', '9999');
      var ret = service.get('cook3');
      expect(ret).toBe('9999');
    });

    it('should be able to remove a cookie', function() {
      service.set('cook4', '1111');
      service.delete('cook4');
      expect(service.check('cook4')).toBeFalsy();
    });

    it ('should be able delete all cookie', function() {
      service.deleteAll();
      var ret = service.getAll();

      expect(Object.keys(ret).length).toBe(0);
    });
  });
});
