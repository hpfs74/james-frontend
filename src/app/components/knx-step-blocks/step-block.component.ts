import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'knx-step-block',
  template: `
    <div class="knx-step-block">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./step-block.component.scss']
})

export class StepBlockComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
