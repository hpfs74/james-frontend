import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-form-group-info',
  template: `
  <div class="knx-form-group--info">
    <ng-content select="knx-form-group"></ng-content>

    <knx-info *ngIf="infoMessage" size="md" isFloating="true" class="knx-info" [class.knx-info--description]="hasDescription">
      <div class="knx-info__content">
        <div class="knx-message knx-message--arrow-top">
          <div class="knx-message__content" [innerHTML]="infoMessage">
          </div>
        </div>
      </div>
    </knx-info>
  </div>
  `
})
export class FormGroupInfoComponent {
  @Input() infoMessage: string;
  @Input() hasDescription: boolean;
}
