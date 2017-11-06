import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'knx-service-guide',
  styleUrls: ['./service-guide.scss'],
  template: `
    <div class="container knx-service-guide">
      <div class="row">
        <div class="col">
          Knab Verzekeren is een handelsnaam van Knab Advies en Bemiddeling N.V., een onderdeel van Aegon.
          Knab Verzekeren is geregistreerd bij de AFM en ingeschreven bij de KvK.
          Meer informatie vind je in de <a target="_blank" href="/assets/docs/knab-verzekeren-dienstenwijzer.pdf">Knab
          Verzekeren Dienstenwijzer (PDF)</a>.
        </div>
      </div>
    </div>
  `
})
export class ServiceGuideComponent {

}
