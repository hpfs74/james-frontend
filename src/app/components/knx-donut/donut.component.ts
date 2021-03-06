import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-donut',
  styleUrls: ['./donut.component.scss'],
  template: `
    <div class="knx-donut" [attr.viewBox]="viewBox">
      <svg class="knx-donut__circle knx-donut--animate">
        <g>
          <circle class="knx-donut__percentage circle_animation"
            [attr.r]="radius"
            [attr.cy]="center"
            [attr.cx]="center"
            [attr.stroke-width]="width"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="getOffset(percentage)"/>

          <circle class="knx-donut__percentage circle_animation"
            [attr.r]="outlineFirstRadius"
            [attr.cy]="center"
            [attr.cx]="center"
            [attr.stroke-width]="outline"
            [attr.stroke-dasharray]="180"
            [attr.stroke-dashoffset]="0"/>

          <circle class="knx-donut__percentage circle_animation"
            [attr.r]="outlineSecondRadius"
            [attr.cy]="center"
            [attr.cx]="center"
            [attr.stroke-width]="outline"
            [attr.stroke-dasharray]="180"
            [attr.stroke-dashoffset]="0"/>
        </g>
        <g *ngIf="percentage">
          <text class="knx-donut__text"
                transform="rotate(90)"
                text-anchor="middle"
                [attr.x]="this.radius + this.width"
                [attr.y]="-22"
                stroke-width="0">
            {{ percentage | round }}%
          </text>
        </g>
      </svg>
    </div>
  `
  // TODO: implement animation callback to dynamically get dash-offset @thomas-g
  // animations: [
  //   trigger('drawCircle', [
  //     state('in', style({transform: 'translateX(0)'})),
  //     transition('void => *', [
  //       style({ 'stroke-dashoffset': getOffset(this.percentage, this.circumference) }),
  //       animate(100)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({transform: 'translateX(100%)'}))
  //     ])
  //   ])
  // ]
})
export class DonutComponent {
  @Input() percentage: number;
  @Input() radius = 25;
  @Input() width = 5;
  @Input() outline = 1;
  @Input() outlineFirstRadius = 23;
  @Input() outlineSecondRadius = 27;

  get circumference() {
    return Math.PI * 2 * this.radius;
  }

  get center() {
    return this.radius + (this.width / 2);
  }

  get viewBox() {
    return '0 0 ' + (this.center * 2).toString() + ' ' + (this.center * 2).toString();
  }

  getOffset(percentage: number): number {
    return (1 - percentage / 100) * this.circumference;
  }
}
