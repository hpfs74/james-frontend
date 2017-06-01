import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

describe('Service: LoaderService (isolated test)', () => {
  let service: LoaderService;
  beforeEach(() => { service = new LoaderService(); });

  it('loaderState should return observable value', (done: DoneFn) => {
    service.loaderState.subscribe(value => {
      expect(value).toBeDefined();
      done();
    });
    service.show();
  });
});
