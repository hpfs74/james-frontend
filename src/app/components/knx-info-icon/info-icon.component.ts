import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { KNXTooltipOptions } from '@knx/tooltip';

@Component({
  selector: 'knx-info-icon',
  template: `
    <div #container class="knx-info-icon knx-icon-question-circle" (click)="openTooltip()">
      <knx-tooltip [options]="_options" [(isVisible)]="isVisible">
        <ng-content></ng-content>
      </knx-tooltip>
    </div>
  `,
  styles: [`
    .knx-info-icon {
      cursor: pointer;
    }

    .knx-icon-question-circle {
      font-size: 18px;
    }
  `]
})
export class InfoIconComponent implements OnInit {
  _options: KNXTooltipOptions;
  isVisible: boolean;

  @Input() set options(value: KNXTooltipOptions) {
    this._options = Object.assign({}, this._options, value);
  }

  @ViewChild('container') container: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOutsideClose($event) {
    if (!this.container.nativeElement.contains($event.target)) {
      this.isVisible = false;
    }
  }

  ngOnInit() {
    if (!this._options) {
      this._options = {
        delay: 300,
        hideCloseButton: false,
        position: 'bottom',
        showOn: 'click',
        target: this.container,
        alwaysModal: false
      } as KNXTooltipOptions;
    }
  }

  openTooltip() {
    this.isVisible = true;
  }
}
