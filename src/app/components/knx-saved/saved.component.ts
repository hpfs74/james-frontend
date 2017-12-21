import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-saved',
  styleUrls: ['./saved.component.scss'],
  template: `
    <div class="container knx-saved">
      <div class="row">
        <div class="col">
          <p class="knx-saved__title">{{ title }}</p>

          <ul class="knx-list--unstyled">
            <li *ngFor="let insurance of insurances?.car?.insurance; let first = first;">
              <div class="pull-right" *ngIf="first">
                <button (click)="startNewAdvice()" class="knx-button knx-button--fullwidth knx-button--secondary knx-button--ghost">
                  Start nieuw advies
                </button>
              </div>
              <div *ngIf="!insurance.manually_added">
                <div class="knx-saved__icon knx-icon-automobile pull-left"></div>

                <p>
                  {{insurance.license}} | {{insurance.make}} {{insurance.model}}

                  <br>

                  <strong>{{insurance.insurance_name}} &bull; {{insurance.price}} &euro; p/m</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <hr>

      <knx-app-promo-block></knx-app-promo-block>
    </div>
  `
})
export class SavedComponent {
  @Input() title: string;
  @Input() insurances: any;
  @Output() onNewAdvice: EventEmitter<any> = new EventEmitter<any>();

  startNewAdvice() {
    this.onNewAdvice.emit();
  }
}
