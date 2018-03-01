import { HttpModule, Http } from '@angular/http';
import { TestModuleMetadata, TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { setUpTestBed } from './../test.common.spec';
import { ContentConfig } from './content.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentConfig', () => {
  let moduleDef: TestModuleMetadata = {
    imports: [
      HttpModule,
      NoopAnimationsModule
    ],
    providers: [ ContentConfig ]
  };
  setUpTestBed(moduleDef);

  it('should load the content', async(inject([ContentConfig], (contentConfig: ContentConfig) => {
    const testKey = 'externalLinks';
    contentConfig.load().then(() => {
      const content = contentConfig.getKey(testKey);
      expect(content).toBeDefined();
      expect(Object.keys(content).length).toBeGreaterThan(0);
    });
  })));
});
