import { LoggingService } from './logging.service';

describe('Service: LoggingService', function () {
  let service: LoggingService;

  beforeEach(() => {
    service = new LoggingService();
  });

  it('all method should be defined', function () {
    expect(service).toBeDefined();
    expect(service.log).toBeDefined();
  });

  describe('log', function () {
    xit('should do a log request', function () {
      service.log({ test: 'log message '});
    });
  });
});
