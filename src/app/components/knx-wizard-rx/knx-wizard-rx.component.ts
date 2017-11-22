import {
  OnInit, AfterViewInit, EventEmitter, Component, ContentChildren, ViewChild,
  ElementRef, AfterContentChecked, Input, Output, ChangeDetectorRef, ContentChild
} from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { hideShowAnimation } from './knx-wizard-rx.animations';
import { KNXStepRxComponent } from './knx-step-rx.component';
import { KNXWizardStepRxOptions, KNXStepError, DEFAULT_OPTIONS } from './knx-wizard-rx.options';
import { Observable } from 'rxjs/Observable';
import { scrollToY } from '../../utils/scroll-to-element.utils';
declare var window: any;
@Component({
  selector: 'knx-wizard-rx',
  styleUrls: ['./knx-wizard-rx.component.scss'],
  animations: [hideShowAnimation],
  templateUrl: './knx-wizard-rx.component.html'
})
export class KNXWizardRxComponent implements OnInit {
  @ContentChild('knxWizardSidebar') sidebar: ElementRef;

  @ViewChild('prevButton') prevButton: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  @Input() stepOptions: KNXWizardStepRxOptions[];

  currentStep: KNXWizardStepRxOptions;
  currentStepIdx: number = null;
  currentComponent: any | KNXStepRxComponent;

  error: KNXStepError;

  private routes: Route[];

  constructor(private changeDetector: ChangeDetectorRef,
              private router: Router,
              public route: ActivatedRoute) {}

  ngOnInit() {
    window.wizard = this;
    if (this.stepOptions) {
      this.routes = this.stepOptions.map(step => step.routeConfig);
    }
    this.setCurrentStepOptions();
  }

  setCurrentStepOptions() {
    this.route.firstChild.params.subscribe(param => {
      if (!param['step-index']) {
        this.currentStep = this.stepOptions[0];
        this.currentStepIdx = 0;
        this.router.navigate([this.routes[0].path, 1]);
      } else {
        this.currentStepIdx = param['step-index'] - 1;
        this.currentStep = this.stepOptions[this.currentStepIdx];
      }
    });
  }

  public onActivate(componentRef: any) {
    scrollToY();
    this.currentComponent = componentRef;
    this.setCurrentStepOptions();
    this.blurButtons();
  }

  public goToNextStep(): void {
    const routeConfig = this.routes[this.currentStepIdx + 1];
    const path = routeConfig ? routeConfig.path : null;
    if (path) {
      this.currentComponent.onNext()
        .subscribe(onNext => this.router.navigate([path]),
        error => this.handleError(error)
      );
    }
  }

  public goToPreviousStep(stepToGoIdx): void {
    this.currentComponent.onBack()
      .subscribe(onBack => {},
        error => this.handleError(error)
    );
  }

  private handleError(err: KNXStepError): void {
    // console.error('cannot move to step');
    this.error = err;
  }

  private blurButtons() {
    if (this.prevButton) {
      this.prevButton.nativeElement.blur();
    }
    if (this.nextButton) {
      this.nextButton.nativeElement.blur();
    }
  }
}
