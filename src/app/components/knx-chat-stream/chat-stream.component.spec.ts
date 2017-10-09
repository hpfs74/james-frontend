import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatStreamOptions } from './chat-stream.options';

describe('Component: ChatStreamComponent', () => {
  let comp: ChatStreamComponent;
  let fixture: ComponentFixture<ChatStreamComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const options: ChatStreamOptions = {
    avatar: {
      name: 'Lisa',
      title: 'Expert autoverzekeringen'
    }
  };

  let moduleDef: TestModuleMetadata = {
    declarations: [ChatStreamComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatStreamComponent);
    comp = fixture.componentInstance;
    comp.options = options;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('div.knx-chat-stream'));
    el = de.nativeElement;
  });

  it('should show an avatar', () => {
    expect(el).not.toBeNull();

    expect(comp.options.avatar.name).toEqual('Lisa');
    expect(comp.options.avatar.title).toEqual('Expert autoverzekeringen');

    const avatarEl = el.getElementsByTagName('knx-avatar');
    expect(avatarEl).not.toBeNull();
  });
});
