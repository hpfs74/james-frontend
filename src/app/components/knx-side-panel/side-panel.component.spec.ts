import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { SidePanelComponent } from './side-panel.component';

describe('Component: SidePanel', () => {
  let comp: SidePanelComponent;
  let fixture: ComponentFixture<SidePanelComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule],
    declarations: [SidePanelComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelComponent);
    comp = fixture.componentInstance;
    comp.show = false;
    fixture.detectChanges();
  });

  it('should define the container element', () => {
    const navElement = fixture.debugElement.query(By.css('div.knx-side-panel'));
    const el = navElement.nativeElement;
    expect(navElement).not.toBeNull();
  });

  it('should open the panel', () => {
    expect(comp.show).toBeFalsy();
    comp.open();
    fixture.detectChanges();
    expect(comp.show).toBeTruthy();
  });

  it('should close the panel', () => {
    comp.show = true;
    fixture.detectChanges();
    expect(comp.show).toBeTruthy();
    comp.close();
    fixture.detectChanges();
    expect(comp.show).toBeFalsy();
  });

  it('should change the animation state on open', () => {
    expect(comp.animationState).toEqual('out');
    comp.open();
    fixture.detectChanges();
     expect(comp.animationState).toEqual('in');
  });

  it('should change the animation state on close', () => {
    comp.open();
    fixture.detectChanges();
    expect(comp.animationState).toEqual('in');

    comp.close();
    fixture.detectChanges();
     expect(comp.animationState).toEqual('out');
  });
});
