import { Component, ViewChild, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { AsyncPreviewComponent } from './async-preview.component';

@Component({
  template: `<knx-async-preview [loading]="loading" [loaded]="loaded"></knx-async-preview >`
})
export class TestHostComponent {
  @ViewChild(AsyncPreviewComponent)
  targetComponent: AsyncPreviewComponent;
  loading = false;
  loaded = false;
}

describe('Component: AsyncPreviewComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [TestHostComponent, AsyncPreviewComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide elements by default', () => {
    let pendingEl = fixture.debugElement.query(By.css('knx-message--pending'));
    let contentEl = fixture.debugElement.query(By.css('knx-message--arrow-top'));

    expect(pendingEl).toBeNull();
    expect(contentEl).toBeNull();
  });

  it('should show pending element on loading', () => {
    let pendingEl = fixture.debugElement.query(By.css('knx-message--pending'));
    let contentEl = fixture.debugElement.query(By.css('knx-message--arrow-top'));

    comp.loading = true;
    fixture.detectChanges();

    expect(pendingEl).toBeDefined();
    expect(contentEl).toBeNull();
  });

  it('should show content on loaded', () => {
    let pendingEl = fixture.debugElement.query(By.css('knx-message--pending'));
    let contentEl = fixture.debugElement.query(By.css('knx-message--arrow-top'));

    comp.loaded = true;
    fixture.detectChanges();

    expect(pendingEl).toBeNull();
    expect(contentEl).toBeDefined();
  });
});

