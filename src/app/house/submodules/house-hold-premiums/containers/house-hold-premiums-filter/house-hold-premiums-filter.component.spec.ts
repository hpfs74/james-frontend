import { ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { setUpTestBed } from './../../../../../../test.common.spec';
import { SharedModule } from '@app/shared.module';
import { HouseHoldPremiumsFilterComponent } from './house-hold-premiums-filter.component';
import { HouseHoldPremiumsFilterForm } from './house-hold-premiums-filter.form';
import { TagsService } from '@core/services';
import { TagsServiceMock } from '@core/services/tags.service.mock.spec';
import { ContentConfig } from '@app/content.config';
import { ContentConfigMock } from '@app/content.mock.spec';
import { KNXLocale } from '@knx/locale/index';
import { of } from 'rxjs/observable/of';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

let translations: any = {'TEST': 'This is a test'};
class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Component({
  template: `
    <knx-house-hold-premiums-filter
      [form]="formFromHost"
      [show]="true"
      optionModifierClass="hidden-xs">
    </knx-house-hold-premiums-filter>`
})
export class TestHostComponent {
  @ViewChild(HouseHoldPremiumsFilterComponent)
  public targetComponent: HouseHoldPremiumsFilterComponent;
  private mockHouseHold = [
    {label: 'Default coverage', value: 'A' },
    {label: 'Extended coverage', value: 'B' }
  ];
  public formFromHost: HouseHoldPremiumsFilterForm = new HouseHoldPremiumsFilterForm(new FormBuilder(),
    this.mockHouseHold);
}

describe('Component: HouseHoldPremiumsFilterComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let translateService: TranslateService;

  let moduleDef: TestModuleMetadata = {
    imports: [NoopAnimationsModule, SharedModule, TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
    })],
    providers: [
      KNXLocale,
      {
        provide: TagsService,
        useValue: TagsServiceMock
      },
      {
        provide: ContentConfig,
        useValue: ContentConfigMock
      }
    ],
    declarations: [HouseHoldPremiumsFilterComponent, TestHostComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.form).toBeDefined();
  });
});
