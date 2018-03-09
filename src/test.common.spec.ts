// angular imports
import { TestBed, async, TestModuleMetadata  } from '@angular/core/testing';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const resetTestingModule = TestBed.resetTestingModule,
  preventAngularFromResetting = () => TestBed.resetTestingModule = () => TestBed;
let allowAngularToReset = () => TestBed.resetTestingModule = resetTestingModule;

export const setUpTestBed = (moduleDef: TestModuleMetadata) => {
  beforeAll(done => (async () => {
    resetTestingModule();
    preventAngularFromResetting();
    TestBed.configureTestingModule(moduleDef);
    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;
  })().then(done).catch(done.fail));

  afterAll(() => allowAngularToReset());
};

let translations: any = {'TEST': 'This is a test'};
export class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}
