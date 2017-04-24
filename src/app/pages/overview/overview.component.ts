import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="knx-container-overview">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <knx-button-icon label="Auto" icon="fa-car" routerLink="/car"></knx-button-icon>
          <knx-button-icon label="Reis" icon="fa-plane"></knx-button-icon>
          <knx-button-icon label="Inboedel" icon="fa-bed"></knx-button-icon>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-sm-12">
          <knx-button-icon label="Opstal" icon="fa-home"></knx-button-icon>
          <knx-button-icon label="Aansprakelijkheid" icon="fa-legal" isPlaceholder="true"></knx-button-icon>
        </div>
      </div>
    </div>
  `
})
export class OverviewComponent implements OnInit {
  ngOnInit() {
    return;
  }
}
