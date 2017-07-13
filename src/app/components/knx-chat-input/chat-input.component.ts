import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlOptions } from '@cx/form-control';
import { CXInputOptions } from '@cx/input';

@Component({
  selector: 'knx-chat-input',
  template: `
    <div class="knx-chat-input">
      <div class="knx-chat-input__text">
        <cx-input #input
          [(ngModel)]="value"
          [options]="options"
          (keyup.enter)="this.sendMessage.emit(input.value); input.value = ''">
        </cx-input>
      </div>
    </div>
  `
})
export class ChatInputComponent implements OnInit {
  @Input() buttonLabel: string;
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();

  value: string;
  options: CXInputOptions;

  ngOnInit() {
    this.options = {
      placeholder: '',
      type: 'text',
      textMask: null
    };
  }
}
