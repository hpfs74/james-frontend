import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="container knx-container-dashboard">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <knx-button-icon label="Auto" routerLink="/car">
            <img class="knx-button-icon__icon" src="/assets/images/icon-car.svg">
          </knx-button-icon>

          <knx-button-icon label="Reis">
            <img class="knx-button-icon__icon" src="/assets/images/icon-travel.svg">
          </knx-button-icon>

          <knx-button-icon label="Inboedel" isPlaceholder="true">
            <img class="knx-button-icon__icon" src="/assets/images/icon-content.svg">
          </knx-button-icon>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-sm-12">
          <knx-button-icon label="Opstal" isPlaceholder="true">
            <img class="knx-button-icon__icon" src="/assets/images/icon-home.svg">
          </knx-button-icon>

          <knx-button-icon label="Aansprakelijkheid" isPlaceholder="true">
            <img class="knx-button-icon__icon" src="/assets/images/icon-liability.svg">
          </knx-button-icon>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    return;
  }
}
