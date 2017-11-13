import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { KNXFooterComponent } from './knx-footer.component';
import { ContentConfig, Content } from '../../content.config';
import { ContentConfigMock } from '../../content.mock.spec';

describe('Component: KNXFooterComponent', () => {
  let comp: KNXFooterComponent;
  let fixture: ComponentFixture<KNXFooterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [KNXFooterComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ],
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(KNXFooterComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should successfuly be able to create a KNXFooterComponent', () => {
    let fixture = TestBed.createComponent(KNXFooterComponent);
    expect(fixture.componentInstance instanceof KNXFooterComponent).toBe(true, 'should create KNXFooterComponent');
  });
});
