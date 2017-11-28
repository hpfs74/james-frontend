import {
  OnInit, EventEmitter, Component, ViewChild,
  ElementRef, Input, Output, ContentChild
} from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { KNXStepRxComponent } from './knx-step-rx.component';
import { KNXWizardStepRxOptions, KNXStepError } from './knx-wizard-rx.options';
import { KNXWizardRxService } from './knx-wizard-rx.service';
import { scrollToY } from '../../utils/scroll-to-element.utils';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
// TODO add animations
@Component({
  selector: 'knx-wizard-rx',
  styleUrls: ['./knx-wizard-rx.component.scss'],
  templateUrl: './knx-wizard-rx.component.html',
})
export class KNXWizardRxComponent implements OnInit {
  @ContentChild('knxWizardSidebar') sidebar: ElementRef;
  @ViewChild('prevButton') prevButton: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @Input() stepOptions: KNXWizardStepRxOptions[];
  @Output() onStepChange: EventEmitter<number> = new EventEmitter<number>();

  currentStep: KNXWizardStepRxOptions;
  currentStepIdx: number = null;
  currentComponent: any | KNXStepRxComponent;
  error: KNXStepError;
  subscription$: Subscription[] = [];
  private routes: Route[];
  constructor(private router: Router,
              public route: ActivatedRoute,
              public knxWizardRxService: KNXWizardRxService) {
    this.setStepSupscriptions();
  }

  setStepSupscriptions(): void {
    this.subscription$.push(
      this.knxWizardRxService.onNext.subscribe(() => this.goToNextStep())
    );
    this.subscription$.push(
      this.knxWizardRxService.onBack.subscribe(() => this.goToNextStep())
    );
  }

  setCurrentStepToFirst(): void {
    if (!this.currentStep) {
      this.currentStep = this.stepOptions[0];
      this.currentStepIdx = 0;
      this.router.navigate([this.routes[0].path]);
    }
  }

  ngOnInit() {
    if (this.stepOptions) {
      this.routes = this.stepOptions.map(step => step.routeConfig);
      this.setCurrentStepToFirst();
    }
  }

  setCurrentStepOptions() {
    this.subscription$.push(
      this.route.firstChild.params.subscribe(param => {
        if (!param['step-index']) {
          this.setCurrentStepToFirst();
        } else {
          this.currentStepIdx = param['step-index'] - 1;
          this.currentStep = this.stepOptions[this.currentStepIdx];
        }
        this.onStepChange.emit(this.currentStepIdx);
      })
    );
  }

  onDeactivate(event): void {
    this.closeSubscriptions();
  }

  closeSubscriptions(): void {
    this.subscription$.forEach(subscription => subscription.unsubscribe);
    this.subscription$ = [];
  }

  onActivate(componentRef: any): void {
    scrollToY();
    this.currentComponent = componentRef;
    if (this.stepOptions) {
      this.setCurrentStepOptions();
      this.onShowStep();
    }
    this.blurButtons();
    this.clearErrors();
  }

  goToStep(stepIndex: number): void {
    if (this.routes[stepIndex]) {
      this.router.navigate([this.routes[stepIndex].path]);
    }
  }

  goToNextStep(): void {
    let step = this.currentStepIdx + 1;
    if (this.currentStep.onBeforeNext) {
      this.subscription$.push(
        this.currentStep.onBeforeNext().subscribe((res) => {
          this.goToStep(step);
        }, error => this.handleError(error))
      );
    } else {
      this.onNext();
    }
  }

  onNext(): void {
    let step = this.currentStepIdx + 1;
    if (this.currentComponent.onNext) {
      this.subscription$.push(
        this.currentComponent.onNext().subscribe(() => {
          this.goToStep(step);
        }, error => this.handleError(error))
      );
    }
  }

  onShowStep(): void {
    let onShowStep = this.currentStep.onShowStep;
    if (onShowStep) {
      onShowStep();
    }
  }

  goToPreviousStep(step): void {
    this.router.navigate([this.routes[step].path]);
  }

  handleError(err: KNXStepError): void {
    // console.error('cannot move to step');
    this.error = err;
  }

  clearErrors() {
    this.error = undefined;
  }

  blurButtons() {
    if (this.prevButton) {
      this.prevButton.nativeElement.blur();
    }
    if (this.nextButton) {
      this.nextButton.nativeElement.blur();
    }
  }
}
