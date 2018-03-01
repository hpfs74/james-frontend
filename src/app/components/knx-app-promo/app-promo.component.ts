import { Component, Input, OnInit } from '@angular/core';

import { ContentConfig } from '../../content.config';

@Component({
  selector: 'knx-app-promo-block',
  styleUrls: ['app-promo.component.scss'],
  template: `
    <div class="visible-xs knx-app-promo-block__phone--xs">
      <img src="/assets/images/phone_image.svg">
    </div>

    <div class="knx-card knx-app-promo-block">
      <div class="row">
        <div class="col-md-8 col-lg-9 col-sm-12">
          <div class="hidden-sm-down">
            <p class="knx-app-promo-block__subtitle">Al je verzekeringen bij elkaar?</p>
            <h3 class="knx-app-promo-block__title">De Knab Verzekeren App</h3>
          </div>

          <ul class="knx-list--checks knx-list--yellow">
            <li>Eén overzicht met al je verzekeringen</li>
            <li>Alle nood-nummers van al je verzekeraars bij de hand</li>
            <li>Ontvang meldingen zodra je kunt besparen</li>
          </ul>

          <div class="knx-app-promo-block__buttons">
            <a class="knx-button knx-button--primary knx-button--3d knx-icon-android" href="{{iOSLink}}"
               title="Download iOS App" rel="noopener">iOS</a>
            <a class="knx-button knx-button--primary knx-button--3d knx-icon-apple" href="{{androidLink}}" rel="noopener"
               title="Download Android App">Android</a>
          </div>
        </div>

        <div class="col-md-4 col-lg-3 knx-app-promo-block__phone hidden-xs">
          <img src="/assets/images/phone_image.svg">
        </div>
      </div>
    </div>
  `
})
export class AppPromoBlockComponent implements OnInit {
  iOSLink: string;
  androidLink: string;

  constructor(private contentConfig: ContentConfig) {}

  ngOnInit() {
    const appStoreLinks = this.contentConfig.getKey('appStore');
    this.iOSLink = appStoreLinks.iOS;
    this.androidLink = appStoreLinks.android;
  }
}
