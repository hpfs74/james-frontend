import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChatStreamComponent } from './chat-stream.component';
import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessage } from './chat-message';

describe('Component: ChatStreamComponent', () => {
  let comp: ChatStreamComponent;
  let fixture: ComponentFixture<ChatStreamComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let options: ChatStreamOptions = {
    avatar: {
      show: true,
      name: 'Marjolein',
      title: 'Expert autoverzekeringen'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatStreamComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatStreamComponent);
    comp = fixture.componentInstance;

    // Provide Input() data
    comp.options = options;
   // comp.messages = messages;

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-chat-stream'));
    el = de.nativeElement;
  });

  it('should show an avatar', () => {
    expect(el).not.toBeNull();

    expect(comp.options.avatar.show).toBe(true);
    expect(comp.options.avatar.name).toEqual('Marjolein');
    expect(comp.options.avatar.title).toEqual('Expert autoverzekeringen');

    let avatarEl = el.getElementsByTagName('knx-avatar');
    expect(avatarEl).not.toBeNull();
  });

  // xit('should render the specified number of messages', () => {
  //   expect(el).not.toBeNull();
  //   expect(el.querySelectorAll('knx-chat-message').length).toBe(messages.length);
  // });
});
