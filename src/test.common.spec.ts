// angular imports
import { TestBed, async, TestModuleMetadata  } from '@angular/core/testing';

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
