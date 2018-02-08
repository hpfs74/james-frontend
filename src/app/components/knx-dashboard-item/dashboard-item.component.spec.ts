import { NO_ERRORS_SCHEMA, Component, DebugElement, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';

import { setUpTestBed } from './../../../test.common.spec';
import { Insurance } from '@insurance/models';
import { DashboardItemComponent } from '@app/components/knx-dashboard-item/dashboard-item.component';

@Component({
  template: `
    <knx-dashboard-item [item]="fromHostItem"></knx-dashboard-item>`
})
export class TestHostComponent {
  @ViewChild(DashboardItemComponent)
  targetComponent: DashboardItemComponent;
  fromHostItem: Insurance;
}

describe('Component: CollapseMessage', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const insuranceMock: Insurance = {
    _id: '1',
    type: 'car',
    status: 'xx',
    reference: 'xx',
    label: 'xx',
    insurance_logo: 'xx'
  };
  const insuranceMockNoLogo: Insurance = {
    _id: '1',
    type: 'car',
    status: 'xx',
    reference: 'xx',
    label: 'xx'
  };


  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule],
    declarations: [TestHostComponent, DashboardItemComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
  });

  it('should use image if present in insurance', () => {
    comp.fromHostItem = insuranceMock;
    fixture.detectChanges();
    expect(comp.targetComponent.image.url).toBe(insuranceMock.insurance_logo);
    expect(comp.targetComponent.image.width).toBe(90);
    expect(comp.targetComponent.image.height).toBe(90);
    expect(comp.targetComponent.image.x).toBe(10);
    expect(comp.targetComponent.image.y).toBe(15);
  });

  it('should use default image if not present in insurance', () => {
    comp.fromHostItem = insuranceMockNoLogo;
    fixture.detectChanges();
    expect(comp.targetComponent.image.url).toBe(comp.targetComponent.defaultImages.car);
    expect(comp.targetComponent.image.width).toBe(60);
    expect(comp.targetComponent.image.height).toBe(60);
    expect(comp.targetComponent.image.x).toBe(25);
    expect(comp.targetComponent.image.y).toBe(25);
  });
});
