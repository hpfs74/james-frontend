import { Component } from '@angular/core';

@Component({
  selector: 'ki-breadcrumb',
  template: `
    <div class="breadcrumb">
      <ul>
        <li class="breadcrumb__home"><a href="/"><span class="fa fa-home"></span></a></li>
        <li class="breadcrumb__item"><a href="">Overzicht</a></li>
        <li class="breadcrumb__item"><a href="">Overzicht</a></li>
        <li class="breadcrumb__item"><a href="">Overzicht</a></li>
      </ul>
    </div>
  `
})
export class BreadCrumbComponent {

}
