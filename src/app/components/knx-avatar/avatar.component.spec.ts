import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { AvatarComponent } from './avatar.component';

describe('Component: AvatarComponent', () => {
  let comp: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [AvatarComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div.knx-avatar'));
    el = de.nativeElement;
  });

  it('should show the avatar', () => {
    expect(el.getElementsByTagName('knx-avatar__image')).not.toBeNull();
  });
});
