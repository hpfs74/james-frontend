import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvatarComponent } from './../knx-avatar/avatar.component';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatStreamOptions } from './chat-stream.options';
import { ChatMessage } from '../../models/chat-message';
import { Car } from '../../models/car';

describe('Component: ChatStreamComponent', () => {
  let comp: ChatStreamComponent;
  let fixture: ComponentFixture<ChatStreamComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let myCar = {
    name: 'Carrera',
    manufacturer: 'Porsche',
    model: 'Turbo',
    year: 2006
  };

  let messages: Array<ChatMessage> = [
    { type: 'text', content: 'Hello World' },
    { type: 'vehicle', content: myCar },
    { type: 'text', content: 'This is a second message' },
    { type: 'text', content: 'This is a second message' }
  ];

  let options: ChatStreamOptions = {
    showAvatar: true,
    avatarName: 'Marjolein',
    avatarTitle: 'Expert autoverzekeringen'
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
    comp.messages = messages;

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-chat-stream'));
    el = de.nativeElement;
  });

  it('should show an avatar', () => {
    expect(el).not.toBeNull();

    expect(comp.options.showAvatar).toBe(true);
    expect(comp.options.avatarName).toEqual('Marjolein');
    expect(comp.options.avatarTitle).toEqual('Expert verzekeringen');

    let avatarEl = el.getElementsByTagName('knx-avatar');
    expect(avatarEl).not.toBeNull();
  });

  it('should render the specified number of messages', () => {
    expect(el).not.toBeNull();
    expect(el.querySelectorAll('knx-chat-message').length).toBe(messages.length);
  });

  it('should render a vehicle type message', () => {
    expect(el).not.toBeNull();
    expect(el.querySelectorAll('knx-vehicle-info').length).toBe(1);
  });
});
