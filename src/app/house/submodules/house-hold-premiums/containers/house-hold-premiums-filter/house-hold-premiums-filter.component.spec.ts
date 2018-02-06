import { ViewChild, Component } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { setUpTestBed } from './../../../../../../test.common.spec';
import { SharedModule } from '@app/shared.module';
import { HouseHoldPremiumsFilterComponent } from './house-hold-premiums-filter.component';
import { HouseHoldPremiumsFilterForm } from './house-hold-premiums-filter.form';

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
    {label: 'Default coverage', value: 'A'},
    {label: 'Extended coverage', value: 'B'}
  ];
  public formFromHost: HouseHoldPremiumsFilterForm = new HouseHoldPremiumsFilterForm(new FormBuilder(),
    this.mockHouseHold);
}

describe('Component: HouseHoldPremiumsFilterComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule, SharedModule],
    providers: [],
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
