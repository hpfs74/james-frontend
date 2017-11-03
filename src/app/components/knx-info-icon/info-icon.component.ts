import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { KNXTooltipComponent, KNXTooltipOptions } from '@knx/tooltip';

@Component({
  selector: 'knx-info-icon',
  template: `
    <span #container class="knx-info-icon knx-icon-question-circle">
      <knx-tooltip [options]="_options">
        <ng-content></ng-content>
      </knx-tooltip>
    </span>
  `,
  styles: [`
    .knx-info-icon {
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
    }
  `]
})
export class InfoIconComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild(KNXTooltipComponent) knxTooltip: KNXTooltipComponent;

  _options: KNXTooltipOptions = {
    position: 'bottom'
  };

  @Input() set options(value: KNXTooltipOptions) {
    this._options = Object.assign({}, this._options, value);
  }

  @HostListener('document:click', ['$event'])
  clickOutsideClose($event) {
    if (!this.container.nativeElement.contains($event.target)) {
      this.knxTooltip.hide($event);
    }
  }

  ngOnInit() {

  }
}
