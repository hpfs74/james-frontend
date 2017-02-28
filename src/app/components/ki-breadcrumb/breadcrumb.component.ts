import { Component, Input } from '@angular/core';
import { Nav } from '../../models/nav';

@Component({
  selector: 'ki-breadcrumb',
  template: `
    <div class="breadcrumb">
      <div class="cx-container container--flat">
        <ul>
          <li *ngFor="let item of items; let i = index" class="breadcrumb__item {{ item.cssClass }}">
            <a *ngIf="i === 0" href="{{ item.url }}"><span class="fa fa-home"></span> {{ item.title }}</a>
            <a *ngIf="i !== 0" href="">{{ item.title }}</a>
          </li>          
        </ul>
      </div>
    </div>
  `
})
export class BreadCrumbComponent {
  @Input() items: Array<Nav>;
}
