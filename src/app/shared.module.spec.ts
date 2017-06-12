import { SharedModule, sharedModules, sharedComponents } from './shared.module';

describe('Shared Module', () => {
  it('should initialize shared modules', () => {
    expect(SharedModule).toBeDefined;
    sharedModules.forEach(module => expect(module).toBeDefined);
    sharedComponents.forEach(component => expect(module).toBeDefined);
  });
});
