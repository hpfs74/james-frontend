import { Component, Input, OnInit } from '@angular/core';

import { ContentConfig } from '../../content.config';

@Component({
  selector: 'knx-app-promo-block',
  styleUrls: ['app-promo.component.scss'],
  templateUrl: './app-promo.component.html'
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
