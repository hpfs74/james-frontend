import { NO_ERRORS_SCHEMA, DebugElement, LOCALE_ID } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { AppPromoBlockComponent } from './app-promo.component';
import { ContentConfig } from '../../content.config';
import { ContentConfigMock } from '../../content.mock';

describe('Component: AppPromoBlockComponent', () => {
  let comp: AppPromoBlockComponent;
  let fixture: ComponentFixture<AppPromoBlockComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [AppPromoBlockComponent],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPromoBlockComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize template links', () => {
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.iOSLink).toContain('itunes.apple.com');
    expect(comp.androidLink).toContain('play.google.com');
  });
});

