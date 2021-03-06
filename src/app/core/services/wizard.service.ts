import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class KNXWizardRxService {

  public currentStepRoutes: Route[] = [];
  private currentRoute: Route = null;
  private _currentStepIndex = 0;
  public activatedRoute: ActivatedRoute = null;
  public routeObservable: Observable<any>;
  constructor(public router: Router, route: ActivatedRoute) {
    // console.log('welcome to wizard service');
    this.routeObservable = router.events;
    this.routeObservable.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log(route);
        // Traverse the active route tree
        let snapshot = route.snapshot;
        let activated = route.firstChild;
        if (activated != null) {
          while (activated != null) {
            // console.log('----------------------------',activated);
            if (activated.routeConfig) {
              if (activated.routeConfig.children) {
                this.activatedRoute = activated;
                this.currentStepRoutes = activated.routeConfig.children.filter(route => route.path !== '' && route.data);
              }
            }
            snapshot = activated.snapshot;
            activated = activated.firstChild;
          }
        }

        // Try finding the 'stepIndex' from the data
        this.currentStepIndex = snapshot.data['stepIndex'] || 0;
      }
    });
  }

  public get currentStepIndex(): number {
    return this._currentStepIndex;
  }

  public set currentStepIndex(index: number) {
    this._currentStepIndex = index;
  }

  currentStepRoute(): Route {
    return this.currentStepRoutes[this.currentStepIndex];
  }

  nextStepRoute(): Route {
    return this.currentStepRoutes[this.currentStepIndex + 1];
  }

  prevStepRoute(): Route {
    return this.currentStepRoutes[this.currentStepIndex - 1];
  }

  getStepRouteByIndex(index: number): Route {
    return this.currentStepRoutes[index];
  }

  goToNextStep() {
    this.navigate(this.nextStepRoute());
  }

  goToPrevStep() {
    this.navigate(this.prevStepRoute());
  }

  goToStep(stepIndex: number) {
    this.navigate(this.getStepRouteByIndex(stepIndex));
  }

  navigate(route: Route) {
    if (route) {
      this.router.navigate([route.path], {relativeTo: this.activatedRoute});
    }
  }
}
