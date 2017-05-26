
import { NavigationService } from './navigation.service';

describe('Service: NavigationService', function () {
  let service: NavigationService;

  beforeEach( () => {
    service = new NavigationService();
  });

  it('all method should be defined', function() {
    expect(service).toBeDefined();
    expect(service.getMenu).toBeDefined();
  });

  describe('navigation getMenu methods', function () {
    it('should return 3 element array', function () {
      let ret = service.getMenu();
      expect(ret).not.toBeNull();
      expect(ret.length).toBe(1);
    });
  });

});
