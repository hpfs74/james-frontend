
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
<<<<<<< HEAD
<<<<<<< HEAD
      expect(ret.length).toBe(1);
=======
      expect(ret.length).toBe(4);
>>>>>>> 8ea29ad... feat(opening-hours): add opening-hours component to navbar
=======
      expect(ret.length).toBe(3);
>>>>>>> d95a30e... fix(styles): minor icon style improvement
    });
  });

});
