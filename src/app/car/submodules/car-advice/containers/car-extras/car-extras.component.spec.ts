import { CarExtrasForm } from './car-extras.form';
import { ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { setUpTestBed } from './../../../../../../test.common.spec';
import { SharedModule } from '../../../../../shared.module';
import { CarExtrasComponent } from './car-extras.component';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

let translations: any = {'TEST': 'This is a test'};

class TranslateLoaderMock implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

@Component({
  template: `
    <div>
      <knx-car-extras [form]="formFromHost" [show]="true" optionModifierClass="hidden-xs"></knx-car-extras>
    </div>`
})
export class TestHostComponent {
  @ViewChild(CarExtrasComponent)
  public targetComponent: CarExtrasComponent;
  public formFromHost: CarExtrasForm = new CarExtrasForm(new FormBuilder());
  private mockFormValues = {label: 'test', value: 'VALUE '};
}

describe('Component: CarExtrasComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let translateService: TranslateService;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule, SharedModule, TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: TranslateLoaderMock},
    })],
    providers: [],
    declarations: [CarExtrasComponent, TestHostComponent]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    translateService = TestBed.get(TranslateService);
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
