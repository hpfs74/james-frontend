import { Component, Input } from '@angular/core';
import { Nav } from '../../models/nav';

@Component({
  selector: 'ki-breadcrumb',
  template: `
    <div class="breadcrumb">
      <div class="cx-container container--flat">
        <ul>
          <li *ngFor="let item of items; let i = index" class="{{ item.cssClass }}">
            <a href="{{ item.url }}"><span class="fa fa-home"></span> {{ item.title }}</a>
          </li>
          <li class="breadcrumb__item"><a href="">Overzicht</a></li>
          <li class="breadcrumb__item"><a href="">Overzicht</a></li>
          <li class="breadcrumb__item"><a href="">Overzicht</a></li>
        </ul>
      </div>
    </div>
  `
})
export class BreadCrumbComponent {
  @Input() items: Array<Nav>;
}