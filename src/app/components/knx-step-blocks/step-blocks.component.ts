import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'knx-step-blocks',
  styleUrls: ['./step-blocks.component.scss'],
  template: `
    <div class="knx-step-blocks knx-step-blocks--arrowed">
      <h2 class="knx-step-blocks__title">{{ title }}</h2>
      <div class="knx-step-blocks__inner">
        <ng-content select="knx-step-block"></ng-content>
      </div>
    </div>
  `
})
export class StepBlocksComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() { }
}
