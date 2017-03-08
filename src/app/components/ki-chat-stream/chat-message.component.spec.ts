import { ChatStreamOptions } from './chat-stream.options';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatStreamComponent } from './chat-stream.component';
import { ChatMessage } from '../../models/chat-message';

describe('Component: ChatMessageComponent', () => {
  let comp: ChatStreamComponent;
  let fixture: ComponentFixture<ChatStreamComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let messages: Array<ChatMessage>;
  let options: ChatStreamOptions;

  //TODO: mock sub components

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ChatStreamComponent],
  //     imports: [FormsModule]
  //   }).compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ChatStreamComponent);
  //   comp = fixture.componentInstance;

  //   this.messages = [
  //     { type: 'text', content: 'Hello World' },
  //     { type: 'text', content: 'This is a second message' }
  //   ];

  //   this.options = {
  //     showAvatar: true,
  //     avatarName: 'Marjolein',
  //     avatarTitle: 'Expert verzekeringen'
  //   };

  //   fixture.detectChanges();
  //   de = fixture.debugElement.query(By.css('div.ki-chat-stream'));
  //   el = de.nativeElement;
  // });

  // it('should show an avatar', () => {
  //   expect(el).not.toBeNull();

  //   comp.options = this.options;
  //   fixture.detectChanges();

  //   expect(comp.options.showAvatar).toBe(true);
  //   expect(comp.options.avatarName).toEqual('Marjolein');
  //   expect(comp.options.avatarTitle).toEqual('Expert verzekeringen');

  //   let avatarEl = el.getElementsByTagName('ki-avatar');
  //   expect(avatarEl).not.toBeNull();
  // });
});
