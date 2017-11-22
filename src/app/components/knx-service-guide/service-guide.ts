import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContentConfig } from '../../content.config';

@Component({
  selector: 'knx-service-guide',
  styleUrls: ['./service-guide.scss'],
  template: `
    <div class="container knx-service-guide" *ngIf="visible">
      <div class="row">
        <div class="col">
          Knab Verzekeren is een handelsnaam van Knab Advies en Bemiddeling N.V., een onderdeel van Aegon.
          Knab Verzekeren is geregistreerd bij de AFM en ingeschreven bij de KvK.
          Meer informatie vind je in de
          <a target="_blank" href="{{ serviceGuideLink }}">Knab
            Verzekeren Dienstenwijzer (PDF)</a>.
        </div>
      </div>
    </div>
  `
})
export class ServiceGuideComponent {
  @Input() visible = false;

  serviceGuideLink: string;

  constructor(private contentConfig: ContentConfig) {
    this.serviceGuideLink = this.contentConfig.getContent().externalLinks.serviceGuide;
  }

}
