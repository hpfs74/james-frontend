import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from '../../../test.common.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { SavedComponent } from './saved.component';
import { AppPromoBlockComponent } from '../knx-app-promo/app-promo.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

let translations: any = {'TEST': 'This is a test'};
class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('Component: Saved', () => {
  let comp: SavedComponent;
  let fixture: ComponentFixture<SavedComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
      })
    ],
    declarations: [SavedComponent, AppPromoBlockComponent],
    providers: [
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-saved'));
    el = de.nativeElement;
  });

  it('should show insurances and greetings', () => {
    comp.title = 'Hello World';
    comp.insurances = {
      car: {
        insurance: [
          {
            license: '01XLXL',
            make: 'Honda',
            model: 'Civic',
            insurance_name: 'auto',
            price: '1234',
            manually_added: false
          },
          {
            license: '01XLX1',
            make: 'BMW',
            model: '3',
            insurance_name: 'auto',
            price: '4321',
            manually_added: false
          }
        ]
      }
    };

    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('.knx-saved__title')).nativeElement;
    expect(title.textContent).toContain('Hello World');

    let parElements = de.queryAll(By.css('.knx-list--unstyled li'));
    expect(parElements).toBeDefined();
    expect(parElements.length).toEqual(2);

    const first = parElements[0].nativeElement;
    expect(first.textContent).toContain('01XLXL');
  });

  it('should emit on start new button click', () => {
    spyOn(comp.onNewAdvice, 'emit');
    comp.startNewAdvice();
    fixture.detectChanges();
    expect(comp.onNewAdvice.emit).toHaveBeenCalled();
  });
});
