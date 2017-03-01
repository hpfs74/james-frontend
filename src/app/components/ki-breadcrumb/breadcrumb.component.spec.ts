import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadCrumbComponent } from './breadcrumb.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
class RoutingComponent { }

@Component({
  template: ''
})
class DummyComponent { }

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = Observable.of({ id: 'profile' });
  }
}

describe('Component: BreadCrumb', () => {
  let router: Router;
  let location: Location;
  let activatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent, data: { breadcrumb: 'Home' } },
          { path: 'profile', component: DummyComponent, data: { breadcrumb: 'Profile' } },
          { path: 'about', component: DummyComponent, data: { breadcrumb: 'About' } }
        ])
      ],
      declarations: [BreadCrumbComponent, RoutingComponent, DummyComponent]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location, _activatedRoute: MockActivatedRoute) => {
    router = _router;
    location = _location;
    activatedRoute = _activatedRoute;
  }));

  it('should have a breadcrumb element', () => {
    let fixture = TestBed.createComponent(BreadCrumbComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.breadcrumb'));
    let el = de.nativeElement;
    expect(el).toBeDefined();
  });

  it('should navigate to home', async(() => {
    let fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.navigate(['/home']).then(() => {
      expect(location.path()).toBe('/home');
    });
  }));

  it('should initialize the breadcrumbs', () => {
    let fixture = TestBed.createComponent(BreadCrumbComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();

    router.navigate(['/profile']).then(() => {
      expect(location.path()).toBe('/profile');

      component.parseRoute(router.routerState.snapshot.root);
      fixture.detectChanges();
      expect(component.breadcrumbs).toBeDefined();
      expect(component.breadcrumbs.length).toBe(3);
    });
  });
});
