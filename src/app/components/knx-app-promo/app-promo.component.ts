import { Component, Input, OnInit } from '@angular/core';

import { ContentConfig } from '../../content.config';

@Component({
  selector: 'knx-app-promo-block',
  styleUrls: ['app-promo.component.scss'],
  template: `
    <div class="row knx-app-promo-block">
      <div class="col-md-6 col-lg-4 col-sm-12">
        <div class="hidden-sm-up">
          <!--<p class="knx-app-promo-block__subtitle">Al je verzekeringen bij elkaar?</p>-->
          <!--<h3 class="knx-app-promo-block__title">De Knab Verzekeren App</h3>-->
        </div>

        <img src="/assets/images/devices_iphone-x2.png" class="knx-app-promo-block__iphone">
      </div>

      <div class="col-md-6 col-lg-8 col-sm-12">
        <div class="hidden-sm-down">
          <p class="knx-app-promo-block__subtitle">Al je verzekeringen bij elkaar?</p>
          <h3 class="knx-app-promo-block__title">De Knab Verzekeren App</h3>
        </div>

        <ul class="knx-list--checks knx-list--green">
          <li>Eén overzicht met al je verzekeringen</li>
          <li>Alle nood-nummers van al je verzekeraars bij de hand</li>
          <li>Ontvang meldingen zodra je kunt besparen</li>
        </ul>

        <div class="knx-app-promo-block__buttons">
          <a class="knx-button knx-button--primary knx-icon-android" href="{{iOSLink}}"
            title="Download iOS App" rel="noopener">iOS</a>
          <a class="knx-button knx-button--primary knx-icon-apple" href="{{androidLink}}" rel="noopener"
            title="Download Android App">Android</a>
        </div>
      </div>
    </div>
  `
})
export class AppPromoBlockComponent implements OnInit {
  @Input() iOSLink: string;
  @Input() androidLink: string;

  constructor(private contentConfig: ContentConfig) {}

  ngOnInit() {
    const appStoreLinks = this.contentConfig.getKey('appStore');
    this.iOSLink = appStoreLinks.iOS;
    this.androidLink = appStoreLinks.android;
  }
}
