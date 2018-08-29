import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-thank-you',
  styleUrls: ['./thank-you.component.scss'],
  template: `
    <div class="container knx-thank-you">
      <div class="row">
        <div class="col">
          <div class="knx-card">
            <h2 class="knx-thank-you__title">{{title}}</h2>

            <!-- car specific copy -->
            <div *ngIf="loggedIn">
              <ng-container *ngIf="insuranceType === 'autoverzekering'; else default">
                <p>{{'car.purchased.logged_in.text1' | translate}}</p>
                <p>{{'car.purchased.logged_in.text2' | translate}}</p>
              </ng-container>
            </div>

            <ol *ngIf="!loggedIn">
              <li>{{'car.purchased.anonymous.text1' | translate}}</li>
              <li>{{'car.purchased.anonymous.text2' | translate}}</li>
            </ol>

            <p>{{'car.purchased.note' | translate}}</p>

            <p *ngIf="phone && phoneLink">
              {{'car.purchased.phone' | translate}} <a href="{{phoneLink}}" rel="noopener">{{phone}}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ThankYouComponent {
  @Input() title: string;
  @Input() insuranceType: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() phoneLink: string;
  @Input() loggedIn: boolean;
}
