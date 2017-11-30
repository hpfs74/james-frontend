import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

@Injectable()
export class KNXWizardRxService {
  // onNext: Subject<any> = new Subject();
  // onBack: Subject<any> = new Subject();
  stepRoutes: Route[] = [];
  constructor(private store$: Store<fromRoot.State>,
              public router: Router,
              public route: ActivatedRoute) {}

  setStepRoutes(): void {
    this.stepRoutes = this.route.routeConfig.children.filter(route => route.data && route.data.hasOwnProperty('step'));
  }

  nextStep(): Observable<any> {
    let currentComponent: any = this.route.routeConfig.component;
    let currentComponentIndex: number = this.route.routeConfig.children.findIndex(child => child.component === currentComponent);
    let nextPath = this.route.routeConfig.children[currentComponentIndex + 1] ?
                   this.route.routeConfig.children[currentComponentIndex + 1].path :
                   null;
    if (nextPath) {
      // console.log(nextPath);
      return Observable.of(this.router.navigate([nextPath]));
    }
    return Observable.empty();
    // this.onNext.next('next step');
  }

  prevStep(): Observable<any> {
    return Observable.empty();
    // this.onBack.next('previous step');
  }

  goToStep(stepIndex: number): Observable<any> {
    return Observable.empty();
  }
}
