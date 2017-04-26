
import { NicciService }  from './nicci.service';

describe('Service: NicciService', function () {
  let service: NicciService;

  beforeEach( () => {
    service = new NicciService(null, null);
  });

  it('all method should be defined', function() {
    expect(service).toBeDefined();
    expect(service.getNicciKey).toBeDefined();
    expect(service.isNicciProfileActive).toBeDefined();
    expect(service.signIn).toBeDefined();
  });

  describe('Method', function() {
    it('should login correctly');
    it('should report invalid login');
    it('should get valid nicci key');
    it('should check if user is active');
  });
});
