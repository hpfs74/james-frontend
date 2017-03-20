import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="ki-container-overview">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <ki-button-icon label="Auto" icon="fa-car" routerLink="/car"></ki-button-icon>
          <ki-button-icon label="Reis" icon="fa-plane"></ki-button-icon>
          <ki-button-icon label="Inboedel" icon="fa-bed"></ki-button-icon>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-sm-12">
          <ki-button-icon label="Opstal" icon="fa-home"></ki-button-icon>
          <ki-button-icon label="Aansprakelijkheid" icon="fa-legal" isPlaceholder="true"></ki-button-icon>
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
