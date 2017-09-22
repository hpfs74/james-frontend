import { NavigationService } from './navigation.service';

describe('Service: NavigationService', function () {
  let service: NavigationService;

  beforeEach(() => {
    service = new NavigationService();
  });

  it('all method should be defined', function () {
    expect(service).toBeDefined();
    expect(service.getMenu).toBeDefined();
  });

  describe('navigation getMenu methods', function () {
    it('should return nav element array', function () {
      const ret = service.getMenu();
      expect(ret).not.toBeNull();
      expect(ret.length).toBe(1);
    });

    it('should contain phone information', () => {

      const ret = service.getMenu();
      expect(ret.map((x) => {
        return x.id;
      })).toContain('menu-phone');
    });

    it('should not contain link to Dashboard', () => {
      const ret = service.getMenu();
      expect(ret.map((x) => {
        return x.id;
      })).not.toContain('menu-dashboard');
    });
  });
});
