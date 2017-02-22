import { Component, Input } from '@angular/core';
import { Section, Nav } from '../../models/nav.d';

@Component({
  selector: 'ki-navbar',
  template: `<nav class="navbar navbar-default" role="navigation">
  <div class="cx-container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
        aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
    </div>
    <div class="row">
      <div class="cx-col-md-4 cx-col-sm-4 cx-col-xs-9">
        <div class="logo">
          <a href="/"><img src="/assets/images/knab-logo.svg?la=nl" alt="Logo Knab"></a>
        </div>
      </div>
      <ul class="nav navbar-nav list-inline">
        <li class="" *ngFor="let item of MenuItems; let i = index">
          <a id="{{item.Id}}" href="item.Url" target="{{ item.Target }}">{{ item.Title }}</a>
        </li>
      </ul>
      <ul class="nav nav-pills pull-right" *ngIf="LoginAccess">
        <li><a href="https://www.knab.nl"><i class="fa fa-chevron-left" aria-hidden="true"></i>Uitloggen</a></li>
      </ul>
    </div>
  </div>
</nav>`,
})
export class NavbarComponent {
  @Input() MenuItems : Array<Nav>;
}
