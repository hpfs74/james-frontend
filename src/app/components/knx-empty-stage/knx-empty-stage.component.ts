import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-empty-stage',
  styleUrls: ['./knx-empty-stage.component.scss'],
  templateUrl: './knx-empty-stage.component.html'
})
export class KnxEmptyStageComponent {
  @Input() height = '150';
}
