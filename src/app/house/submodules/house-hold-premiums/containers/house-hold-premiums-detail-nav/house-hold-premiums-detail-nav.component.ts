import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UIPair } from '@core/models/ui-pair';

@Component({
  selector: 'knx-house-hold-premiums-detail-nav',
  styleUrls: ['./house-hold-premiums-detail-nav.component.scss'],
  templateUrl: './house-hold-premiums-detail-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldPremiumsDetailNavComponent {
  @Input() pills: UIPair[];
  @Input() show: boolean;
  @Input() optionModifierClass: string;

  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Output() buy: EventEmitter<any> = new EventEmitter<any>();
}
