import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Nav } from '../../models/nav';

@Component({
  selector: 'ki-breadcrumb',
  template: `
    <div class="breadcrumb">
      <div class="container container--flat">
        <ul>
          <li><a class="breadcrumb-home" routerLink="/"><span class="fa fa-home"></span></a></li>
          <li *ngFor="let breadcrumb of breadcrumbs; let i = index;">
            <a class="breadcrumb-item" [routerLink]="[breadcrumb.url]">{{  breadcrumb.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class BreadCrumbComponent implements OnInit {
  breadcrumbs: {
    name: string;
    url: string
  }[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.breadcrumbs = [];
      this.parseRoute(this.router.routerState.snapshot.root);
    });
  }

  parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      let urlSegments: UrlSegment[] = [];
      node.pathFromRoot.forEach(routerState => {
        urlSegments = urlSegments.concat(routerState.url);
      });
      let url = urlSegments.map(urlSegment => {
        return urlSegment.path;
      }).join('/');
      this.breadcrumbs.push({
        name: node.data['breadcrumb'],
        url: '/' + url
      });
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }
}
