
import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { NicciService } from './nicci.service';

const appConfig = require('../../../config/api/config.json');

class MockConfigService {
  public config = appConfig;
}

describe('Service: NicciService', function () {
  let service: NicciService;

  //TODO
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpModule],
  //     providers: [
  //       { provide: ConfigService, useValue: MockConfigService },
  //       VideoService
  //     ]
  //   });
  //});

  xit('all method should be defined', function() {
    //expect(service).toBeDefined();
    //expect(service.login).toBeDefined();
  });

  describe('Method', function() {
    xit('should login correctly');
    xit('should report invalid login');
    xit('should get valid nicci key');
    xit('should check if user is active');
  });
});
