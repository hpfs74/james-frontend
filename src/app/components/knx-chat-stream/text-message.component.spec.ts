import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';

import { setUpTestBed } from './../../../test.common.spec';
import { TextMessageComponent } from './text-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: TextMessageComponent', () => {
  let comp: TextMessageComponent;
  let fixture: ComponentFixture<TextMessageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule],
    declarations: [TextMessageComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMessageComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div.knx-message'));
    el = de.nativeElement;
  });

  it('should show the message', () => {
    expect(el).not.toBeNull();
  });

  it('should add date to message', () => {
    const currentDate = moment(new Date()).format('DD-MM-YYYY HH-MM');
    const messageDate = moment(comp.getMessageDate()).format('DD-MM-YYYY HH-MM');
    expect(messageDate).toEqual(currentDate);
  });
});
