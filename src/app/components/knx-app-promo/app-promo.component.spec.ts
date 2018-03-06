import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';

import { setUpTestBed, TranslateLoaderMock } from '../../../test.common.spec';
import { AppPromoBlockComponent } from './app-promo.component';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('Component: AppPromoBlockComponent', () => {
  let comp: AppPromoBlockComponent;
  let fixture: ComponentFixture<AppPromoBlockComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
      })
    ],
    declarations: [AppPromoBlockComponent],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
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

